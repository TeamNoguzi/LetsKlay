pragma solidity >= 0.8.0 < 0.9.0;

contract Funding {

  struct Fund {
    bytes32 rewardId;
    uint amount;
  }

  struct Reward {
    bytes32 rewardId;
    uint price;
  }

  mapping(address => mapping (bytes32 => Fund)) funds;
  mapping(bytes32 => Reward) rewardMap;

  uint fundCur;
  uint fundGoal;
  address owner;

  constructor(bytes32[] memory rewardIds, uint[] memory prices, uint _fundGoal) {
    for(uint i = 0; i < rewardIds.length ; i++) {
      rewardMap[rewardIds[i]] = Reward({rewardId: rewardIds[i], price: prices[i]});
    }
    fundGoal = _fundGoal;
    fundCur = 0;
    owner = msg.sender;
  }

  function addFund(bytes32 rewardId, uint32 amount) external payable {
    uint cost = amount * rewardMap[rewardId].price * 1e9;
    require(msg.value >= cost);

    funds[msg.sender][rewardId] = Fund({rewardId: rewardId, amount: funds[msg.sender][rewardId].amount + amount});

    uint excess = msg.value - cost;
    if(excess > 0)
      payable(msg.sender).transfer(excess);
    
    // when fund is success
    fundCur = fundCur + cost;
    if(fundCur >= fundGoal)
      payable(owner).transfer(fundCur);
  }

  function removeFund(bytes32 rewardId, uint32 amount) external {
    require(amount >= 0 && funds[msg.sender][rewardId].amount >= amount);

    uint refund = amount * rewardMap[rewardId].price * 1e9;
    funds[msg.sender][rewardId].amount -= amount;
    payable(msg.sender).transfer(refund);

    fundCur = fundCur - refund;
  }

}
