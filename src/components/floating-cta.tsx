import { INSTA, PHONE, waMsg } from "@/lib/site";
import { WaIcon, InstaIcon } from "./icons";

export const FloatingCTA = () => (
  <div className="float-cta">
    <div className="float-row">
      <div className="float-label">Chat on WhatsApp</div>
      <a
        href={waMsg("Hi! I'm interested in your Dholera projects. Please share details.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <button className="float-btn float-wa">
          <WaIcon size={24} />
        </button>
      </a>
    </div>
    <div className="float-row">
      <div className="float-label">Follow on Instagram</div>
      <a href={INSTA} target="_blank" rel="noreferrer" aria-label="Follow on Instagram">
        <button className="float-btn float-insta">
          <InstaIcon size={20} />
        </button>
      </a>
    </div>
    <div className="float-row">
      <div className="float-label">Call Us</div>
      <a href={`tel:+${PHONE}`} aria-label="Call us">
        <button className="float-btn float-call" style={{ fontSize: 18 }}>
          📞
        </button>
      </a>
    </div>
  </div>
);
