export default function Nav() {
  return (
    <nav className="hibi-nav">
      <div className="left">
        <a href="#">Features</a>
        <a href="#">Solutions</a>
        <a href="#">Pricing</a>
        <a href="#">About</a>
      </div>
      <div className="wm">Hibi</div>
      <div className="right">
        <a className="login" href="#">Login</a>
        <a className="btn btn-primary btn-sm" href="#">Start for free</a>
        <a className="btn btn-glass btn-sm" href="#">Book a demo</a>
      </div>
    </nav>
  );
}
