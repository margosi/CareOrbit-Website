"use client";

/* Prev/next for the "Orbits are expanding" row, from Home.dc.html.
 *
 * Hidden above 900px, where the three cards sit side by side and expand on
 * hover. Below it, responsive.css turns the row into a scroll-snap strip
 * and shows these; they scroll it by one card, which is all exPrev/exNext
 * did in the Design. A phone can swipe, but the arrows make it discoverable
 * that there is a third card off-screen.
 *
 * Its own component only because app/page.tsx is a server component and
 * these need onClick.
 */
export function ExploreNav() {
  const scrollByCard = (dir: -1 | 1) => {
    const el = document.querySelector("[data-explore-row]");
    if (el)
      el.scrollBy({ left: dir * (el.clientWidth - 28), behavior: "smooth" });
  };

  return (
    <div
      data-ex-nav=""
      style={{
        display: "none",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: -12,
        paddingBottom: 20,
        borderBottom: "1px solid rgba(255,255,255,.18)",
      }}
    >
      <button
        onClick={() => scrollByCard(-1)}
        aria-label="Previous"
        style={btn}
      >
        &larr;
      </button>
      <button onClick={() => scrollByCard(1)} aria-label="Next" style={btn}>
        &rarr;
      </button>
    </div>
  );
}

const btn: React.CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255,255,255,.12)",
  color: "#FFFFFF",
  fontSize: 16,
  cursor: "pointer",
};
