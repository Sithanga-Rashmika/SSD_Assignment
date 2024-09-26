import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useAuth } from "../src/components/Auth/AuthContext"
import { MedicinePage } from "./pages/medicinePages/medicinePage"
import { MedicineDetailsPage } from "./pages/medicinePages/medicineDetailsPage"
import SideBar from "./screen/SideBar"
import { UpdateMedicinePage } from "./pages/medicinePages/updateMedicinePage"
import Login from "./screen/Login"
import AdminSignin from "./Sign/AdminSignin"
import SuserSignup from "./Sign/SuserSignup"
import SuserSignin from "./Sign/SuserSignin"
import AddDog from "./pages/dogsPages/addDog"
import AddHealthDetails from "./pages/dogsPages/addHealth"
import ViewAll from "./pages/dogsPages/viewDogs"
import Addappointment from "./screen/Addappointment"
import AddUser from "./screen/AddUser"
import Viewappointment from "./screen/Viewappointment"
import ViewRescuedDogs from "./components/ViewRescuedDogs"
import Adoption from "./components/Adoption"
import { DogList } from "./pages/dogsPages/dogsList"
import UpdateDog from "./pages/dogsPages/updateDog"
import GeneratePrescriptions from "./pages/dogsPages/generatePrescriptions"
import RescuedDogRegistration from "./components/RescuedDogRegistration"
import MultiStepForm from "./components/RegisterRescuedDogs/MultiStepForm"
import UpdateHealth from "./pages/dogsPages/UpdateHealth"
import { SalesPage } from "./pages/medicinePages/salesPage"
import { SalesReport } from "./reports/salesReport"
import Home from "./screen/Home"
import EditAppointment from "./screen/EditAppointment"
import "./App.css"

function App() {
  const { token } = useAuth()
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <Routes>
          {/* Publicly visible routes */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/adminsignin" element={<AdminSignin />} />
          <Route exact path="/susersignup" element={<SuserSignup />} />
          <Route exact path="/susersignin" element={<SuserSignin />} />
          <Route exact path="/" element={<Home />} />

          {/* Protected routes */}
          {token && (
            <>
              <Route path="/medicine" element={<MedicinePage />} />
              <Route path="/medicines" element={<MedicineDetailsPage />} />
              <Route
                path="/updatemedicine/:id"
                element={<UpdateMedicinePage />}
              />
              <Route path="/addDog" element={<AddDog />} />
              <Route path="/addHealth/:id" element={<AddHealthDetails />} />
              <Route path="/viewDogs" element={<ViewAll />} />
              <Route path="/dogs" element={<DogList />} />
              <Route
                exact
                path="/addappointment"
                element={<Addappointment />}
              />
              <Route exact path="/adduser" element={<AddUser />} />
              <Route
                exact
                path="/viewappointment"
                element={<Viewappointment />}
              />
              <Route
                exact
                path="/editappointment/:id"
                element={<EditAppointment />}
              />
              <Route exact path="/sidebar" element={<SideBar />} />
              <Route
                exact
                path="/viewstrayPuppies"
                element={<ViewRescuedDogs />}
              />
              <Route exact path="/adoption/:id" element={<Adoption />} />
              <Route
                exact
                path="/rescuedDogRegistration"
                element={<RescuedDogRegistration />}
              />
              <Route exact path="/registerResDog" element={<MultiStepForm />} />
              <Route exact path="/UpdateDog/:id" element={<UpdateDog />} />
              <Route
                exact
                path="/prescriptions"
                element={<GeneratePrescriptions />}
              />
              <Route
                exact
                path="/UpdateHealth/:id"
                element={<UpdateHealth />}
              />
              <Route exact path="/sales" element={<SalesPage />} />
              <Route exact path="/salesreport" element={<SalesReport />} />
              <Route exact path="/registerResDog" element={<MultiStepForm />} />
            </>
          )}

          {/* Redirect to login for unauthorized users */}
          {!token && <Route path="*" element={<Navigate to="/susersignin" />} />}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App