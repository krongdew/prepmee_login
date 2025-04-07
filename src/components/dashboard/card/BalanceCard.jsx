export default function BalanceCard({ data }) {
    return (
      <>
        <tr>
          <th scope="row">{data.amount.toFixed(2)}</th>
          <td className="vam">{data.date}</td>
          <td className="vam">{data.method}</td>
          <td className="vam">
            <span
              className={`pending-style ${data.status === 1 ? "style1" : ""} ${
                data.status === 2 ? "style2" : ""
              } ${data.status === 3 ? "style3" : ""}`}
            >
              Pending
            </span>
          </td>
        </tr>
      </>
    );
  }
  