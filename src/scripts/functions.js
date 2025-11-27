function groupByMonth(records) {
  const groups = {};

  for (const item of records) {
    const date = new Date(item.event_date);

    // Create month label like "November 2025"
    const monthLabel = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!groups[monthLabel]) {
      groups[monthLabel] = [];
    }

    groups[monthLabel].push(item);
  }

  console.log(groups);

  // Convert to desired output format
  return Object.entries(groups).map(([month, records]) => ({
    month,
    records,
  }));
}
