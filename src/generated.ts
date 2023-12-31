//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DeadManSwitch
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deadManSwitchABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_safe', internalType: 'contract GnosisSafe', type: 'address' }],
  },
  { type: 'error', inputs: [], name: 'NotGnosisSafe' },
  {
    type: 'error',
    inputs: [
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'state', internalType: 'enum IDeadManSwitch.TxState', type: 'uint8' },
    ],
    name: 'PredecessorNotExecuted',
  },
  {
    type: 'error',
    inputs: [
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'state', internalType: 'enum IDeadManSwitch.TxState', type: 'uint8' },
    ],
    name: 'PredecessorNotPending',
  },
  {
    type: 'error',
    inputs: [{ name: 'triggerTime', internalType: 'uint256', type: 'uint256' }],
    name: 'TooEarlyToExecute',
  },
  {
    type: 'error',
    inputs: [{ name: 'triggerTime', internalType: 'uint256', type: 'uint256' }],
    name: 'TriggerTimeTooEarly',
  },
  { type: 'error', inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32' }], name: 'TxFailed' },
  { type: 'error', inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32' }], name: 'TxNotPending' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: true }],
    name: 'CancelledTx',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: true }],
    name: 'ExecutedTx',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8', indexed: false },
      { name: 'nonce', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'triggerType', internalType: 'enum IDeadManSwitch.TriggerType', type: 'uint8', indexed: false },
      { name: 'triggerTime', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'ScheduledTx',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'secondaryGuard', internalType: 'address', type: 'address', indexed: false }],
    name: 'SecondaryGuardSet',
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateTxHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'cancelTx',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'success', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkAfterExecution',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address payable', type: 'address' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
      { name: 'msgSender', internalType: 'address', type: 'address' },
    ],
    name: 'checkTransaction',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'executeTx',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastInteractionTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'safe',
    outputs: [{ name: '', internalType: 'contract GnosisSafe', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'triggerType', internalType: 'enum IDeadManSwitch.TriggerType', type: 'uint8' },
      { name: 'triggerTime', internalType: 'uint240', type: 'uint240' },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'scheduleTx',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'scheduledTx',
    outputs: [
      {
        name: '',
        internalType: 'struct IDeadManSwitch.ScheduledTxInfo',
        type: 'tuple',
        components: [
          { name: 'state', internalType: 'enum IDeadManSwitch.TxState', type: 'uint8' },
          { name: 'triggerType', internalType: 'enum IDeadManSwitch.TriggerType', type: 'uint8' },
          { name: 'triggerTime', internalType: 'uint240', type: 'uint240' },
          { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'scheduledTxCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'secondaryGuard',
    outputs: [{ name: '', internalType: 'contract ISecondaryGuard', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_secondaryGuard', internalType: 'contract ISecondaryGuard', type: 'address' }],
    name: 'setSecondaryGuard',
    outputs: [],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DeadManSwitchFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deadManSwitchFactoryABI = [
  { type: 'error', inputs: [{ name: 'guard', internalType: 'address', type: 'address' }], name: 'GuardAlreadySet' },
  {
    type: 'error',
    inputs: [{ name: 'guard', internalType: 'address', type: 'address' }],
    name: 'GuardNotDeadManSwitch',
  },
  { type: 'error', inputs: [], name: 'MismatchedVersion' },
  { type: 'error', inputs: [], name: 'ModuleNotFound' },
  { type: 'error', inputs: [], name: 'NotDelegateCall' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', internalType: 'address', type: 'address', indexed: false }],
    name: 'AddedOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'approvedHash', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ApproveHash',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'handler', internalType: 'address', type: 'address', indexed: false }],
    name: 'ChangedFallbackHandler',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'guard', internalType: 'address', type: 'address', indexed: false }],
    name: 'ChangedGuard',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'threshold', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'ChangedThreshold',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: false }],
    name: 'DisabledModule',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: false }],
    name: 'EnabledModule',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'payment', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ExecutionFailure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: true }],
    name: 'ExecutionFromModuleFailure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: true }],
    name: 'ExecutionFromModuleSuccess',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'payment', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ExecutionSuccess',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', internalType: 'address', type: 'address', indexed: false }],
    name: 'RemovedOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'SafeReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'initiator', internalType: 'address', type: 'address', indexed: true },
      { name: 'owners', internalType: 'address[]', type: 'address[]', indexed: false },
      { name: 'threshold', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'initializer', internalType: 'address', type: 'address', indexed: false },
      { name: 'fallbackHandler', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'SafeSetup',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'deadManSwitch', internalType: 'address', type: 'address', indexed: false }],
    name: 'SetupDeadManSwitch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'msgHash', internalType: 'bytes32', type: 'bytes32', indexed: true }],
    name: 'SignMsg',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'deadManSwitch', internalType: 'address', type: 'address', indexed: false }],
    name: 'ToreDownDeadManSwitch',
  },
  { stateMutability: 'nonpayable', type: 'fallback' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: '_threshold', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addOwnerWithThreshold',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'hashToApprove', internalType: 'bytes32', type: 'bytes32' }],
    name: 'approveHash',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'approvedHashes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_threshold', internalType: 'uint256', type: 'uint256' }],
    name: 'changeThreshold',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'dataHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
      { name: 'requiredSignatures', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'checkNSignatures',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'dataHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'checkSignatures',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'prevModule', internalType: 'address', type: 'address' },
      { name: 'module', internalType: 'address', type: 'address' },
    ],
    name: 'disableModule',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'domainSeparator',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'enableModule',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address', type: 'address' },
      { name: '_nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'encodeTransactionData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address payable', type: 'address' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execTransaction',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
    ],
    name: 'execTransactionFromModule',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
    ],
    name: 'execTransactionFromModuleReturnData',
    outputs: [
      { name: 'success', internalType: 'bool', type: 'bool' },
      { name: 'returnData', internalType: 'bytes', type: 'bytes' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'start', internalType: 'address', type: 'address' },
      { name: 'pageSize', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getModulesPaginated',
    outputs: [
      { name: 'array', internalType: 'address[]', type: 'address[]' },
      { name: 'next', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getOwners',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'offset', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getStorageAt',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getThreshold',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address', type: 'address' },
      { name: '_nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTransactionHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'isModuleEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'isOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'prevOwner', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: '_threshold', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'removeOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
    ],
    name: 'requiredTxGas',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'handler', internalType: 'address', type: 'address' }],
    name: 'setFallbackHandler',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'guard', internalType: 'address', type: 'address' }],
    name: 'setGuard',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_owners', internalType: 'address[]', type: 'address[]' },
      { name: '_threshold', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'fallbackHandler', internalType: 'address', type: 'address' },
      { name: 'paymentToken', internalType: 'address', type: 'address' },
      { name: 'payment', internalType: 'uint256', type: 'uint256' },
      { name: 'paymentReceiver', internalType: 'address payable', type: 'address' },
    ],
    name: 'setup',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'function', inputs: [], name: 'setup', outputs: [] },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'signedMessages',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'targetContract', internalType: 'address', type: 'address' },
      { name: 'calldataPayload', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'simulateAndRevert',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'prevOwner', internalType: 'address', type: 'address' },
      { name: 'oldOwner', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'swapOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'prevModule', internalType: 'address', type: 'address' }],
    name: 'teardown',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EtherPaymentFallback
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const etherPaymentFallbackABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'SafeReceived',
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FallbackManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const fallbackManagerABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'handler', internalType: 'address', type: 'address', indexed: false }],
    name: 'ChangedFallbackHandler',
  },
  { stateMutability: 'nonpayable', type: 'fallback' },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'handler', internalType: 'address', type: 'address' }],
    name: 'setFallbackHandler',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnosisHelper
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gnosisHelperABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'address', type: 'address', indexed: false }],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'address[]', type: 'address[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32', indexed: false }],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'int256', type: 'int256', indexed: false }],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address[]', type: 'address[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'logs',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [{ name: 'excludedArtifacts_', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [{ name: 'excludedContracts_', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [{ name: 'excludedSenders_', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [{ name: 'targetedArtifacts_', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [{ name: 'targetedContracts_', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [{ name: 'targetedSenders_', internalType: 'address[]', type: 'address[]' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnosisSafe
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gnosisSafeABI = [
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', internalType: 'address', type: 'address', indexed: false }],
    name: 'AddedOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'approvedHash', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'ApproveHash',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'handler', internalType: 'address', type: 'address', indexed: false }],
    name: 'ChangedFallbackHandler',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'guard', internalType: 'address', type: 'address', indexed: false }],
    name: 'ChangedGuard',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'threshold', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'ChangedThreshold',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: false }],
    name: 'DisabledModule',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: false }],
    name: 'EnabledModule',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'payment', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ExecutionFailure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: true }],
    name: 'ExecutionFromModuleFailure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: true }],
    name: 'ExecutionFromModuleSuccess',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'payment', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ExecutionSuccess',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', internalType: 'address', type: 'address', indexed: false }],
    name: 'RemovedOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address', indexed: true },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'SafeReceived',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'initiator', internalType: 'address', type: 'address', indexed: true },
      { name: 'owners', internalType: 'address[]', type: 'address[]', indexed: false },
      { name: 'threshold', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'initializer', internalType: 'address', type: 'address', indexed: false },
      { name: 'fallbackHandler', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'SafeSetup',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'msgHash', internalType: 'bytes32', type: 'bytes32', indexed: true }],
    name: 'SignMsg',
  },
  { stateMutability: 'nonpayable', type: 'fallback' },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: '_threshold', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addOwnerWithThreshold',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'hashToApprove', internalType: 'bytes32', type: 'bytes32' }],
    name: 'approveHash',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'approvedHashes',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_threshold', internalType: 'uint256', type: 'uint256' }],
    name: 'changeThreshold',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'dataHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
      { name: 'requiredSignatures', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'checkNSignatures',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'dataHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'checkSignatures',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'prevModule', internalType: 'address', type: 'address' },
      { name: 'module', internalType: 'address', type: 'address' },
    ],
    name: 'disableModule',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'domainSeparator',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'enableModule',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address', type: 'address' },
      { name: '_nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'encodeTransactionData',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address payable', type: 'address' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execTransaction',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
    ],
    name: 'execTransactionFromModule',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
    ],
    name: 'execTransactionFromModuleReturnData',
    outputs: [
      { name: 'success', internalType: 'bool', type: 'bool' },
      { name: 'returnData', internalType: 'bytes', type: 'bytes' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'start', internalType: 'address', type: 'address' },
      { name: 'pageSize', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getModulesPaginated',
    outputs: [
      { name: 'array', internalType: 'address[]', type: 'address[]' },
      { name: 'next', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getOwners',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'offset', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getStorageAt',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getThreshold',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address', type: 'address' },
      { name: '_nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getTransactionHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'isModuleEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'isOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'nonce',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'prevOwner', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: '_threshold', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'removeOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
    ],
    name: 'requiredTxGas',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'handler', internalType: 'address', type: 'address' }],
    name: 'setFallbackHandler',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'guard', internalType: 'address', type: 'address' }],
    name: 'setGuard',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_owners', internalType: 'address[]', type: 'address[]' },
      { name: '_threshold', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'fallbackHandler', internalType: 'address', type: 'address' },
      { name: 'paymentToken', internalType: 'address', type: 'address' },
      { name: 'payment', internalType: 'uint256', type: 'uint256' },
      { name: 'paymentReceiver', internalType: 'address payable', type: 'address' },
    ],
    name: 'setup',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    name: 'signedMessages',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'targetContract', internalType: 'address', type: 'address' },
      { name: 'calldataPayload', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'simulateAndRevert',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'prevOwner', internalType: 'address', type: 'address' },
      { name: 'oldOwner', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'swapOwner',
    outputs: [],
  },
  { stateMutability: 'payable', type: 'receive' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnosisSafeProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gnosisSafeProxyABI = [
  {
    stateMutability: 'nonpayable',
    type: 'constructor',
    inputs: [{ name: '_singleton', internalType: 'address', type: 'address' }],
  },
  { stateMutability: 'payable', type: 'fallback' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GnosisSafeProxyFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gnosisSafeProxyFactoryABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'proxy', internalType: 'contract GnosisSafeProxy', type: 'address', indexed: false },
      { name: 'singleton', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'ProxyCreation',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_singleton', internalType: 'address', type: 'address' },
      { name: 'initializer', internalType: 'bytes', type: 'bytes' },
      { name: 'saltNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateCreateProxyWithNonceAddress',
    outputs: [{ name: 'proxy', internalType: 'contract GnosisSafeProxy', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'singleton', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'createProxy',
    outputs: [{ name: 'proxy', internalType: 'contract GnosisSafeProxy', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_singleton', internalType: 'address', type: 'address' },
      { name: 'initializer', internalType: 'bytes', type: 'bytes' },
      { name: 'saltNonce', internalType: 'uint256', type: 'uint256' },
      { name: 'callback', internalType: 'contract IProxyCreationCallback', type: 'address' },
    ],
    name: 'createProxyWithCallback',
    outputs: [{ name: 'proxy', internalType: 'contract GnosisSafeProxy', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: '_singleton', internalType: 'address', type: 'address' },
      { name: 'initializer', internalType: 'bytes', type: 'bytes' },
      { name: 'saltNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createProxyWithNonce',
    outputs: [{ name: 'proxy', internalType: 'contract GnosisSafeProxy', type: 'address' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'proxyCreationCode',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [],
    name: 'proxyRuntimeCode',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Guard
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const guardABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'success', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkAfterExecution',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address payable', type: 'address' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
      { name: 'msgSender', internalType: 'address', type: 'address' },
    ],
    name: 'checkTransaction',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GuardManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const guardManagerABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'guard', internalType: 'address', type: 'address', indexed: false }],
    name: 'ChangedGuard',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'guard', internalType: 'address', type: 'address' }],
    name: 'setGuard',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IDeadManSwitch
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iDeadManSwitchABI = [
  { type: 'error', inputs: [], name: 'NotGnosisSafe' },
  {
    type: 'error',
    inputs: [
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'state', internalType: 'enum IDeadManSwitch.TxState', type: 'uint8' },
    ],
    name: 'PredecessorNotExecuted',
  },
  {
    type: 'error',
    inputs: [
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
      { name: 'state', internalType: 'enum IDeadManSwitch.TxState', type: 'uint8' },
    ],
    name: 'PredecessorNotPending',
  },
  {
    type: 'error',
    inputs: [{ name: 'triggerTime', internalType: 'uint256', type: 'uint256' }],
    name: 'TooEarlyToExecute',
  },
  {
    type: 'error',
    inputs: [{ name: 'triggerTime', internalType: 'uint256', type: 'uint256' }],
    name: 'TriggerTimeTooEarly',
  },
  { type: 'error', inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32' }], name: 'TxFailed' },
  { type: 'error', inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32' }], name: 'TxNotPending' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: true }],
    name: 'CancelledTx',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: true }],
    name: 'ExecutedTx',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      { name: 'value', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8', indexed: false },
      { name: 'nonce', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'triggerType', internalType: 'enum IDeadManSwitch.TriggerType', type: 'uint8', indexed: false },
      { name: 'triggerTime', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'ScheduledTx',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'secondaryGuard', internalType: 'address', type: 'address', indexed: false }],
    name: 'SecondaryGuardSet',
  },
  {
    stateMutability: 'pure',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'calculateTxHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'cancelTx',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'success', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkAfterExecution',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address payable', type: 'address' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
      { name: 'msgSender', internalType: 'address', type: 'address' },
    ],
    name: 'checkTransaction',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'nonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'executeTx',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'lastInteractionTimestamp',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'safe',
    outputs: [{ name: '', internalType: 'contract GnosisSafe', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'triggerType', internalType: 'enum IDeadManSwitch.TriggerType', type: 'uint8' },
      { name: 'triggerTime', internalType: 'uint240', type: 'uint240' },
      { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'scheduleTx',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'txHash', internalType: 'bytes32', type: 'bytes32' }],
    name: 'scheduledTx',
    outputs: [
      {
        name: '',
        internalType: 'struct IDeadManSwitch.ScheduledTxInfo',
        type: 'tuple',
        components: [
          { name: 'state', internalType: 'enum IDeadManSwitch.TxState', type: 'uint8' },
          { name: 'triggerType', internalType: 'enum IDeadManSwitch.TriggerType', type: 'uint8' },
          { name: 'triggerTime', internalType: 'uint240', type: 'uint240' },
          { name: 'predecessor', internalType: 'bytes32', type: 'bytes32' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'scheduledTxCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'secondaryGuard',
    outputs: [{ name: '', internalType: 'contract ISecondaryGuard', type: 'address' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_secondaryGuard', internalType: 'contract ISecondaryGuard', type: 'address' }],
    name: 'setSecondaryGuard',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC165
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc165ABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'interfaceID', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3ABI = [
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
  {
    stateMutability: 'payable',
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IProxy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iProxyABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'masterCopy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IProxyCreationCallback
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iProxyCreationCallbackABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'proxy', internalType: 'contract GnosisSafeProxy', type: 'address' },
      { name: '_singleton', internalType: 'address', type: 'address' },
      { name: 'initializer', internalType: 'bytes', type: 'bytes' },
      { name: 'saltNonce', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'proxyCreated',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ISecondaryGuard
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iSecondaryGuardABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'safe', internalType: 'address', type: 'address' },
      { name: 'txHash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'success', internalType: 'bool', type: 'bool' },
    ],
    name: 'checkAfterExecution',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'safe', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
      { name: 'safeTxGas', internalType: 'uint256', type: 'uint256' },
      { name: 'baseGas', internalType: 'uint256', type: 'uint256' },
      { name: 'gasPrice', internalType: 'uint256', type: 'uint256' },
      { name: 'gasToken', internalType: 'address', type: 'address' },
      { name: 'refundReceiver', internalType: 'address payable', type: 'address' },
      { name: 'signatures', internalType: 'bytes', type: 'bytes' },
      { name: 'msgSender', internalType: 'address', type: 'address' },
    ],
    name: 'checkTransaction',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ISignatureValidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iSignatureValidatorABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: '_data', internalType: 'bytes', type: 'bytes' },
      { name: '_signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ModuleManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const moduleManagerABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: false }],
    name: 'DisabledModule',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: false }],
    name: 'EnabledModule',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: true }],
    name: 'ExecutionFromModuleFailure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'module', internalType: 'address', type: 'address', indexed: true }],
    name: 'ExecutionFromModuleSuccess',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'prevModule', internalType: 'address', type: 'address' },
      { name: 'module', internalType: 'address', type: 'address' },
    ],
    name: 'disableModule',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'enableModule',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
    ],
    name: 'execTransactionFromModule',
    outputs: [{ name: 'success', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
      { name: 'operation', internalType: 'enum Enum.Operation', type: 'uint8' },
    ],
    name: 'execTransactionFromModuleReturnData',
    outputs: [
      { name: 'success', internalType: 'bool', type: 'bool' },
      { name: 'returnData', internalType: 'bytes', type: 'bytes' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'start', internalType: 'address', type: 'address' },
      { name: 'pageSize', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getModulesPaginated',
    outputs: [
      { name: 'array', internalType: 'address[]', type: 'address[]' },
      { name: 'next', internalType: 'address', type: 'address' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'module', internalType: 'address', type: 'address' }],
    name: 'isModuleEnabled',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OnlyDelegateCall
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const onlyDelegateCallABI = [{ type: 'error', inputs: [], name: 'NotDelegateCall' }] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// OwnerManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownerManagerABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', internalType: 'address', type: 'address', indexed: false }],
    name: 'AddedOwner',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'threshold', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'ChangedThreshold',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'owner', internalType: 'address', type: 'address', indexed: false }],
    name: 'RemovedOwner',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: '_threshold', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'addOwnerWithThreshold',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: '_threshold', internalType: 'uint256', type: 'uint256' }],
    name: 'changeThreshold',
    outputs: [],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getOwners',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'getThreshold',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'isOwner',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'prevOwner', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: '_threshold', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'removeOwner',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'prevOwner', internalType: 'address', type: 'address' },
      { name: 'oldOwner', internalType: 'address', type: 'address' },
      { name: 'newOwner', internalType: 'address', type: 'address' },
    ],
    name: 'swapOwner',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StdInvariant
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stdInvariantABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [{ name: 'excludedArtifacts_', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [{ name: 'excludedContracts_', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [{ name: 'excludedSenders_', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [{ name: 'targetedArtifacts_', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [{ name: 'targetedContracts_', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [{ name: 'targetedSenders_', internalType: 'address[]', type: 'address[]' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// StorageAccessible
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const storageAccessibleABI = [
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'offset', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getStorageAt',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'targetContract', internalType: 'address', type: 'address' },
      { name: 'calldataPayload', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'simulateAndRevert',
    outputs: [],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Test
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const testABI = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'address', type: 'address', indexed: false }],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'address[]', type: 'address[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32', indexed: false }],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'int256', type: 'int256', indexed: false }],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address[]', type: 'address[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'logs',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [{ name: 'excludedArtifacts_', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [{ name: 'excludedContracts_', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [{ name: 'excludedSenders_', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [{ name: 'targetedArtifacts_', internalType: 'string[]', type: 'string[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [{ name: 'targetedContracts_', internalType: 'address[]', type: 'address[]' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [{ name: 'targetedSenders_', internalType: 'address[]', type: 'address[]' }],
  },
] as const
