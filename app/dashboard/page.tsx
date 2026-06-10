import type { Metadata } from "next";
import Link from "next/link";
import Mark from "@/components/Mark";

export const metadata: Metadata = {
  title: "Merchant dashboard",
  description:
    "Hibi merchant dashboard — verified visits, regulars, and payouts (stub).",
};

const NAV = ["Overview", "Visits", "Members", "Payouts", "Settings"];

// Illustrative sample rows. Day counts / members / times are sample data;
// amounts depend on pricing that isn't set yet -> TODO(jiaming).
const ROWS: {
  place: string;
  color: string;
  member: string;
  day: number;
  time: string;
}[] = [
  {
    place: "Oslo Coffee",
    color: "var(--sky)",
    member: "Mia R.",
    day: 47,
    time: "8:12 AM",
  },
  {
    place: "Rosette Wine Bar",
    color: "var(--pink)",
    member: "Dani K.",
    day: 29,
    time: "7:40 PM",
  },
  {
    place: "Idlewild Books",
    color: "var(--green)",
    member: "Theo L.",
    day: 12,
    time: "1:05 PM",
  },
  {
    place: "Saffron Deli",
    color: "var(--orange)",
    member: "Wen H.",
    day: 5,
    time: "12:30 PM",
  },
  {
    place: "Oslo Coffee",
    color: "var(--sky)",
    member: "Sam P.",
    day: 50,
    time: "9:01 AM",
  },
];

export default function DashboardPage() {
  return (
    <div className="dash">
      <aside className="dash-side">
        <div className="dash-brand">
          <Mark size={26} />
          <span className="wm">Hibi</span>
        </div>
        <nav className="dash-nav">
          {NAV.map((n, i) => (
            <a key={n} href="#" aria-current={i === 0 ? "page" : undefined}>
              {n}
            </a>
          ))}
        </nav>
        <div className="spacer" />
        <div className="dash-merchant">
          <Mark size={20} color="var(--sky)" />
          <span>Oslo Coffee</span>
        </div>
      </aside>

      <main className="dash-main">
        <div className="dash-top">
          <div>
            <h1>Overview</h1>
            <div className="sub">Oslo Coffee · last 30 days</div>
          </div>
          {/* TODO(jiaming): replace stub with live data */}
          <span className="pill-sample">Stub · sample data</span>
        </div>

        <div className="tiles">
          <div className="tile">
            <div className="lbl">Verified visits</div>
            <div className="val">1,284</div>
            <div className="delta">sample · last 30 days</div>
          </div>
          <div className="tile">
            <div className="lbl">New regulars</div>
            <div className="val">37</div>
            <div className="delta">sample · reached day 50</div>
          </div>
          <div className="tile">
            <div className="lbl">Owed this cycle</div>
            {/* TODO(jiaming): amount = verified visits × per-visit price (pricing not set) */}
            <div className="val todo">—</div>
            <div className="delta">verified visits × price</div>
          </div>
          <div className="tile">
            <div className="lbl">Active members</div>
            <div className="val">612</div>
            <div className="delta">sample · visited this month</div>
          </div>
        </div>

        <div className="panelc">
          <h2>Recent verified visits</h2>
          <div className="table-wrap">
            <table className="dash-tbl">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Member</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={i}>
                    <td>
                      <span className="place">
                        <Mark size={22} color={r.color} />
                        {r.place}
                      </span>
                    </td>
                    <td>{r.member}</td>
                    <td>
                      <span
                        className="status"
                        style={{
                          background: `color-mix(in srgb, ${r.color} 16%, var(--snow))`,
                          color: r.color,
                        }}
                      >
                        {r.day >= 50 ? "Regular" : `Day ${r.day} / 50`}
                      </span>
                    </td>
                    <td>{r.time}</td>
                    <td>
                      {/* TODO(jiaming): per-visit amount (pricing not set) */}
                      <span className="amt-todo">—</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
