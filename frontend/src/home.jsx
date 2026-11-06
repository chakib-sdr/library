const cover_id = [10832290, 6941459, 14630218, 10952280, 12639079, 14612610, 9144523, 382159];

export function Home() {
  return (
    <div>
      {cover_id.map((id) => (
        <img
          key={id}
          src={`https://covers.openlibrary.org/b/id/${id}-M.jpg`}
          alt={`Book cover ${id}`}
        />
      ))}
    </div>
  );
}