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

  function emitEvent (EventType eventType, uint rewardId, uint32 amount) external {
    if(eventType == EventType.ProjectOpen) {
      emit ProjectOpenEvent(msg.sender, rewardId);
    }
    if(eventType == EventType.ProjectClose) {
      emit ProjectCloseEvent (msg.sender);
    }
    else if (eventType == EventType.FundEnd) {
      emit FundEndEvent (msg.sender);
    }
    else if (eventType == EventType.FundResolve) {
      emit FundResolveEvent(msg.sender, rewardId, amount);
    }
    else if (eventType == EventType.FundCancel) {
      emit FundCancelEvent(msg.sender, rewardId, amount);
    }
  }

  function getProjectAddress (uint projectId) view external returns(address) {
    return address(projects[projectId]);
  }
}