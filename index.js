const MoodContractAddr = '0xa765f2CeC898398e465278133Ed8493d92b21894'
const MoodContractABI = [
  {
    inputs: [],
    name: 'getMood',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'string', name: '_mood', type: 'string' }],
    name: 'setMood',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
let MoodContract
let signer

const provider = new ethers.providers.Web3Provider(window.ethereum, 'goerli')

provider.send('eth_requestAccounts', []).then(() => {
  provider.listAccounts().then(accounts => {
    signer = provider.getSigner(accounts[0])
    MoodContract = new ethers.Contract(
      MoodContractAddr,
      MoodContractABI,
      signer
    )
  })
})
async function getMood () {
  const getMoodPromise = MoodContract.getMood()
  const Mood = await getMoodPromise
  console.log(Mood)
}

async function setMood () {
  const mood = document.getElementById('mood').value
  const setMoodPromise = MoodContract.setMood(mood)
  await setMoodPromise
}
