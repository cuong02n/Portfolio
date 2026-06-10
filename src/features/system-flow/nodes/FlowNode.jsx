import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import {
  Monitor, Network, Box, KeyRound, Radio,
  Database, Zap, HardDrive, Cloud,
} from 'lucide-react'
import { nodeKind } from '../lib/palette'

// Map the palette's icon *name* (a string, so seed/palette stay JSX-free) to
// the actual lucide component.
const ICONS = { Monitor, Network, Box, KeyRound, Radio, Database, Zap, HardDrive, Cloud }

// A single diagram block. Four connection handles (one per side) act as both
// source and target so the user can wire edges from whichever side is closest.
function FlowNode({ data, selected }) {
  const kind = nodeKind(data.kind)
  const Icon = ICONS[kind.icon] || Box

  return (
    <div className={`flow-node${selected ? ' selected' : ''}`} style={{ '--accent': kind.color }}>
      <Handle type="target" position={Position.Left}   id="l" />
      <Handle type="target" position={Position.Top}    id="t" />
      <span className="flow-node-icon"><Icon size={18} /></span>
      <div className="flow-node-body">
        <div className="flow-node-label">{data.label}</div>
        {data.subtitle && <div className="flow-node-sub">{data.subtitle}</div>}
      </div>
      <Handle type="source" position={Position.Right}  id="r" />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  )
}

export default memo(FlowNode)
