pragma solidity >= 0.8.0 < 0.9.0;

import './interface.sol';

contract Project {
  enum ProjectState {
    Funding,
    Ended
  }

  struct User {
    uint totalFund;
    mapping (bytes32 => Fund) funds;
  }

  struct Fund {
    uint rewardId;
    address userAddr;
    uint32 amount;
    bool valid;
  }

  struct Reward {
    uint price;
    uint stock;
  }

  mapping(address => User) users;
  mapping(uint => Reward) rewardMap;
  Fund[] funds;

  uint nextFundId;
  uint fundGoal;
  address owner;
  IFactory factory;
  ProjectState state;

  constructor(uint[] memory rewardIds, uint[] memory prices, uint[] memory stocks, uint _fundGoal, address _owner, IFactory _factory) {
    for(uint i = 0; i < rewardIds.length ; i++) {
      rewardMap[rewardIds[i]] = Reward({price: prices[i], stock: stocks[i]});
    }
    fundGoal = _fundGoal;
    owner = _owner;
    factory = _factory;
    state = ProjectState.Funding;
    nextFundId = 1;

    factory.emitEvent(IFactory.EventType.ProjectOpen, address(this), rewardIds[0], 0, 0);
  }

  function addFund(uint rewardId, uint32 amount) external payable {
    require(state == ProjectState.Funding);
    require(rewardMap[rewardId].stock > 0);

    uint cost = amount * rewardMap[rewardId].price * (1 ether);
    require(msg.value >= cost);

    bytes32 fundHashId = keccak256(abi.encodePacked(nextFundId, address(this)));
    Fund memory fund = Fund({
      rewardId: rewardId,
      amount: users[msg.sender].funds[fundHashId].amount + amount,
      userAddr: msg.sender,
      valid: true
    });
    users[msg.sender].funds[fundHashId] = fund;
    funds.push(fund);
    nextFundId += 1;
    rewardMap[rewardId].stock -= 1;

    uint excess = msg.value - cost;
    if(excess > 0)
      payable(msg.sender).transfer(excess);
    
    factory.emitEvent(
      IFactory.EventType.FundResolve, 
      msg.sender, 
      rewardId, 
      amount,
      fundHashId
    );
    
    // when fund is success
    if(address(this).balance >= fundGoal * (1 ether)) {
      payable(owner).transfer(address(this).balance);
      state = ProjectState.Ended;
      factory.emitEvent(IFactory.EventType.FundEnd, address(this), 0, 0, 0);
    }
  }

  function cancelFund(bytes32 fundHashId) external {
    Fund memory fund = users[msg.sender].funds[fundHashId];
    uint refund = fund.amount * rewardMap[fund.rewardId].price * (1 ether);
    payable(msg.sender).transfer(refund);
    fund.valid = false;
    rewardMap[fund.rewardId].stock += 1;

    factory.emitEvent(IFactory.EventType.FundCancel, address(this), fund.rewardId, fund.amount, fundHashId);
  }

  // should be called by the project owner
  function cancelProject() external {
    require(msg.sender == owner);

    for(uint i = 0; i < funds.length; i++) {
      if(funds[i].valid) {
        uint refund = funds[i].amount * rewardMap[funds[i].rewardId].price * (1 ether);
        payable(funds[i].userAddr).transfer(refund);
        funds[i].valid = false;
      }
    }
    state = ProjectState.Ended;
    factory.emitEvent(IFactory.EventType.ProjectClose, address(this), 0, 0, 0);
  }
}
