import { useState, useEffect } from 'react';

const Memos = ({ state }) => {
  const [memos, setMemos] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      try {
        const memos = await contract.getMemos();
        setMemos(memos);
      } catch (error) {
        console.error("Error fetching memos:", error);
      }
    };

    if (contract) {
      memosMessage();
    }
  }, [contract]);

  return (
    <div className="memos-container">
      <h2>Memos</h2>

      {memos.length === 0 ? (
        <p className="no-data">No memos available</p>
      ) : (
        <table className="memos-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Message</th>
              <th>Timestamp</th>
              <th>From</th>
            </tr>
          </thead>
          <tbody>
            {memos.map((memo, index) => (
              <tr key={index}>
                <td>{memo[0]}</td>
                <td>{memo[1]}</td>
                <td>{new Date(Number(memo[2]) * 1000).toLocaleString()}</td>
                <td className="address">{memo[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Memos;
