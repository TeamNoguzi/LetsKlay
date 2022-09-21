pragma solidity >= 0.8.0 < 0.9.0;

import './interface.sol';

contract Project {
  enum ProjectState {
    Funding,
    Ended
  }

  struct User {
    uint totalFund;
    mapping (uint => Fund) funds;
  }

  struct Fund {
    uint rewardId;
    uint amount;
  }

  struct Reward {
    uint rewardId;
    uint price;
  }

  mapping(address => User) users;
  mapping(uint => Reward) rewardMap;

  uint fundGoal;
  address owner;
  IFactory factory;
  ProjectState state;

  constructor(uint[] memory rewardIds, uint[] memory prices, uint _fundGoal, address _owner, IFactory _factory) {
    for(uint i = 0; i < rewardIds.length ; i++) {
      rewardMap[rewardIds[i]] = Reward({rewardId: rewardIds[i], price: prices[i]});
    }
    fundGoal = _fundGoal;
    owner = _owner;
    factory = _factory;
    state = ProjectState.Funding;
  }

  function addFund(uint rewardId, uint32 amount) external payable {
    require(state == ProjectState.Funding);

    uint cost = amount * rewardMap[rewardId].price * 1e9;
    require(msg.value >= cost);

    users[msg.sender].funds[rewardId] = Fund({
      rewardId: rewardId,
      amount: users[msg.sender].funds[rewardId].amount + amount
    });

    uint excess = msg.value - cost;
    if(excess > 0)
      payable(msg.sender).transfer(excess);
    
    factory.emitEvent(IFactory.EventType.FundResolve, rewardId, amount);
    
    // when fund is success
    if(address(this).balance >= fundGoal) {
      payable(owner).transfer(address(this).balance);
      state = ProjectState.Ended;
      factory.emitEvent(IFactory.EventType.FundEnd, 0, 0);
    }
  }

  function removeFund(uint rewardId, uint32 amount) external {
    require(amount >= 0 && users[msg.sender].funds[rewardId].amount >= amount);

    uint refund = amount * rewardMap[rewardId].price * 1e9;
    users[msg.sender].funds[rewardId].amount -= amount;
    payable(msg.sender).transfer(refund);

    factory.emitEvent(IFactory.EventType.FundCancel, rewardId, amount);
  }

  function cancelProject() external {
    state = ProjectState.Ended;
    factory.emitEvent(IFactory.EventType.ProjectClose, 0, 0);
  }
}
