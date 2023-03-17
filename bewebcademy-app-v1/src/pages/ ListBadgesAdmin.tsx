
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import BadgeList from "../components/BadgeList"

const ListBadgesAdmin = () => {
  return (
    <div>
      <Header />
      <div style={{display: "flex", height:"90vh"}}>
        <div style={{ width: '80vw', margin: 'auto', marginTop: "20px"}}>
          <BadgeList />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ListBadgesAdmin;
