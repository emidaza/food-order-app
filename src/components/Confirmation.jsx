

export default function Confirmation({ onClose, result, resultMessage }) {
    return <div className="cart">
        <h2>{result}</h2>
        {resultMessage}
        <p className="modal-actions">
            <button className="button" onClick={onClose}>Okay</button>
        </p>
    </div>
}