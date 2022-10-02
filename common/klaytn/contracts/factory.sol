pragma solidity >= 0.8.0 < 0.9.0;

import "./project.sol";
import "./interface.sol";

contract Factory is IFactory{
  mapping(uint => Project) projects;
  mapping(address => uint) projectIds;
  
  constructor() {}

  function createProject (
    uint[] memory rewardIds, 
    uint[] memory prices,
    uint[] memory stocks,
    uint _fundGoal, 
    uint _projectId
  ) public {
    Project newProject = new Project(rewardIds, prices, stocks, _fundGoal, msg.sender, this);
    projects[_projectId] = newProject;
    projectIds[address(newProject)] = _projectId;
  }

  function emitEvent (EventType eventType, address addr, uint rewardId, uint32 amount, bytes32 fundHashId) external {
    if(eventType == EventType.ProjectOpen) {
      emit ProjectOpenEvent(addr, rewardId);
    }
    if(eventType == EventType.ProjectClose) {
      emit ProjectCloseEvent (addr, projectIds[addr]);
    }
    else if (eventType == EventType.FundEnd) {
      emit FundEndEvent (addr, projectIds[addr]);
    }
    else if (eventType == EventType.FundResolve) {
      emit FundResolveEvent(addr, rewardId, amount, fundHashId);
    }
    else if (eventType == EventType.FundCancel) {
      emit FundCancelEvent(addr, rewardId, amount, fundHashId);
    }
  }

  function getProjectAddress (uint projectId) view external returns(address) {
    return address(projects[projectId]);
  }
}