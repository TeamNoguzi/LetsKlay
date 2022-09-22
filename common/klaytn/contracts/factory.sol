pragma solidity >= 0.8.0 < 0.9.0;

import "./project.sol";
import "./interface.sol";

contract Factory is IFactory{
  mapping(uint => Project) projects;
  
  constructor() {}

  function createProject (
    uint[] memory rewardIds, 
    uint[] memory prices, 
    uint _fundGoal, 
    uint _projectId
  ) public {
    Project newProject = new Project(rewardIds, prices, _fundGoal, msg.sender, this);
    projects[_projectId] = newProject;

  }

  function emitEvent (EventType eventType, address addr, uint rewardId, uint32 amount) external {
    if(eventType == EventType.ProjectOpen) {
      emit ProjectOpenEvent(addr, rewardId);
    }
    if(eventType == EventType.ProjectClose) {
      emit ProjectCloseEvent (addr);
    }
    else if (eventType == EventType.FundEnd) {
      emit FundEndEvent (addr);
    }
    else if (eventType == EventType.FundResolve) {
      emit FundResolveEvent(addr, rewardId, amount);
    }
    else if (eventType == EventType.FundCancel) {
      emit FundCancelEvent(addr, rewardId, amount);
    }
  }

  function getProjectAddress (uint projectId) view external returns(address) {
    return address(projects[projectId]);
  }
}