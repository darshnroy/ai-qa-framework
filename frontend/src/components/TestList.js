import TestCard from "./TestCard";

function TestList({ tests }) {
  return (
    <div>
      {tests.map(t => (
        <TestCard key={t.id} test={t} />
      ))}
    </div>
  );
}

export default TestList;