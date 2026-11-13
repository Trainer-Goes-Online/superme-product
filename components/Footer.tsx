import { Brand } from './Brand';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <Brand small />
        <div className="footnote">
          <p>
            SuperMe is operated by MyEntourage Sàrl (CHE-410.574.084), Rue Saint Pierre 2, 1003 Lausanne, Switzerland.
            Built in Switzerland.
          </p>
          <p>
            <a href="mailto:hello@mysuperme.com">hello@mysuperme.com</a> ·{' '}
            <a href="mailto:support@mysuperme.com">support@mysuperme.com</a>
          </p>
          <p>This coaching and wellbeing experience does not substitute for medical diagnosis or treatment.</p>
          <p className="footer-links">
            <a href="https://www.mysuperme.com/privacy" target="_blank" rel="noopener noreferrer">Privacy policy</a> ·{' '}
            <a href="https://www.mysuperme.com/terms" target="_blank" rel="noopener noreferrer">Terms</a> ·{' '}
            <a href="https://www.mysuperme.com/refund" target="_blank" rel="noopener noreferrer">Refund policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
