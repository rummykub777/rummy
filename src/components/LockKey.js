export default function LockKey({ setIsAlert }) {
    return <div className="lock_key" onClick={() => setIsAlert(true)}>
        <img src="/assets/lock.png" height={32} width={32} alt="user" />
    </div>
}