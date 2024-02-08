import Header from "./components/header";
import DetailTable from "./components/detail-table";
import Buttons from "./components/buttons";

function App() {
  return (
    <>
      <div className="flex">
        <div className="w-5/6">
          <Header />
          <DetailTable />
        </div>
        <Buttons />
      </div>
    </>
  );
}

export default App;
