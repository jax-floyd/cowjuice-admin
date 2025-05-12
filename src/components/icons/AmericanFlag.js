// AmericanFlag.jsx
const AmericanFlag = () => (
  <svg
    viewBox="0 0 7410 3900"
    aria-label="Flag of the United States"
    class="flex w-4 h-4"
  >
    {/* 13 stripes */}
    <rect class="flex w-full h-full" fill="#BF0A30" />
    <g stroke="#FFF" strokeWidth={300}>
      {[...Array(6)].map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={450 + i * 600}
          x2="7410"
          y2={450 + i * 600}
        />
      ))}
    </g>

    {/* canton */}
    <rect width="2964" height="2100" fill="#002868" />

    {/* define a reusable star */}
    <defs>
      <polygon
        id="star"
        points="247,90 317.534,307.082 132.873,172.918 361.127,172.918 176.466,307.082"
      />
    </defs>

    {/* star field: rows are 420 px apart vertically; staggering every other row */}
    <g fill="#fff">
      {[...Array(9)].map((_, row) =>
        [...Array(row % 2 ? 5 : 6)].map((_, col) => (
          <use
            key={`${row}-${col}`}
            href="#star"
            x={col * 494 + (row % 2 ? 247 : 0)}
            y={90 + row * 210}
          />
        ))
      )}
    </g>
  </svg>
);

export default AmericanFlag;
