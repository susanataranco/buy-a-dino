import ButtonAddCar from "./components/ButtonAddCar/ButtonAddCar"

export default function page() {
  return (
    <div>
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Manage your dinos</h2>
          <ButtonAddCar />
        </div>
    </div>
  )
}
