pragma solidity >= 0.8.0 < 0.9.0;

interface IFactory {
  enum EventType {
    ProjectOpen,
    ProjectClose,
    FundEnd,
    FundResolve,
    FundCancel
  }

  event ProjectOpenEvent (address projectAddress, uint rewardId);
  event ProjectCloseEvent (address projectAddress);
  event FundEndEvent (address projectAddress);
  event FundResolveEvent (address projectAddress, uint rewardId, uint32 amount);
  event FundCancelEvent (address projectAddress, uint rewardId, uint32 amount);

  function emitEvent (EventType eventType, uint rewardId, uint32 amount) external;
}