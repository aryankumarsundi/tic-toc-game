export default function Log({logs}) {
    return (
        <div className="log">
            {logs.map((log, index) => (
                <div key={index}>
                    <p>Player: {log.player} clicked [{log.square.row},{log.square.col}]</p>
                </div>
            ))}
        </div>
    );
}