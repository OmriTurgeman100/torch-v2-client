

interface NodeCommentsProps {
    handle_close_comments: () => void
    node_id: number | null | undefined;

}

export const NodeComments = ({handle_close_comments, node_id}: NodeCommentsProps) => {
  return (
    <div>NodeComments</div>
  )
}
