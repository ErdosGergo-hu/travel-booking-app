export default function EmptyTableRow({
  colSpan,
  message,
}: {
  colSpan: number;
  message: string;
}) {
  return (
    <tr>
      <td className="px-4 py-3 text-center text-[#8A8A8A]" colSpan={colSpan}>
        {message}
      </td>
    </tr>
  );
}
