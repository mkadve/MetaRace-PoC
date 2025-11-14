const fs = require("fs");
const path = require("path");
const Web3 = require("web3");

require("dotenv").config();

class VotingService {
  constructor() {
    this.artifact = null;
    this.contract = null;
    this.web3 = null;
    this.ownerAccount = null;
    this.contractAddress = process.env.VOTING_CONTRACT_ADDRESS || "";
    this.rpcUrl = process.env.HARDHAT_RPC_URL || "http://127.0.0.1:8545";
    this.ownerPrivateKey = process.env.VOTING_OWNER_PRIVATE_KEY || "";
  }

  get artifactPath() {
    return path.resolve(
      __dirname,
      "../../blockchain/artifacts/contracts/Voting.sol/Voting.json"
    );
  }

  loadArtifact() {
    if (this.artifact) {
      return this.artifact;
    }

    if (!fs.existsSync(this.artifactPath)) {
      throw new Error(
        "Voting artifact not found. Compile the contract with `npm run hardhat:compile`."
      );
    }

    const artifactRaw = fs.readFileSync(this.artifactPath, "utf-8");
    this.artifact = JSON.parse(artifactRaw);
    return this.artifact;
  }

  ensureInitialized() {
    if (this.contract && this.web3) {
      return;
    }

    const artifact = this.loadArtifact();
    if (!this.contractAddress) {
      throw new Error(
        "VOTING_CONTRACT_ADDRESS is not set. Deploy the contract and update the environment."
      );
    }

    this.web3 = new Web3(this.rpcUrl);
    this.contract = new this.web3.eth.Contract(artifact.abi, this.contractAddress);

    if (this.ownerPrivateKey) {
      const normalizedKey = this.ownerPrivateKey.startsWith("0x")
        ? this.ownerPrivateKey
        : `0x${this.ownerPrivateKey}`;
      this.ownerAccount = this.web3.eth.accounts.wallet.add(normalizedKey);
    }
  }

  ensureOwner() {
    if (!this.ownerAccount) {
      throw new Error(
        "Owner account is not configured. Set VOTING_OWNER_PRIVATE_KEY in the environment."
      );
    }
  }

  async addCandidate(name) {
    this.ensureInitialized();
    this.ensureOwner();

    if (!name || typeof name !== "string" || !name.trim()) {
      throw new Error("Candidate name is required.");
    }

    const method = this.contract.methods.addCandidate(name.trim());
    const gas = await this.estimateGas(method, this.ownerAccount.address);

    return method.send({
      from: this.ownerAccount.address,
      gas,
    });
  }

  async vote(candidateIndex, voterAddress) {
    this.ensureInitialized();

    if (!this.web3.utils.isAddress(voterAddress)) {
      throw new Error("Invalid voter address.");
    }

    const method = this.contract.methods.vote(candidateIndex);
    const gas = await this.estimateGas(method, voterAddress);

    return method.send({
      from: voterAddress,
      gas,
    });
  }

  async getCandidates() {
    this.ensureInitialized();
    const candidates = await this.contract.methods.getCandidates().call();
    return candidates.map((candidate, index) => ({
      index,
      name: candidate.name,
      voteCount: Number(candidate.voteCount),
    }));
  }

  async getWinner() {
    this.ensureInitialized();
    return this.contract.methods.getWinner().call();
  }

  async estimateGas(method, from) {
    try {
      return await method.estimateGas({ from });
    } catch (error) {
      console.warn("Gas estimation failed, using fallback gas limit.", error.message);
      return 300000;
    }
  }
}

module.exports = new VotingService();

