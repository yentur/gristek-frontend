import { FaCheckCircle, FaMapMarkerAlt, FaWater, FaCube } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import gristek_kutu from "../../dist/images/gristek-kutu1.png"

const DashboardModal = ({ title, devices, onClose }) => {
  const formatNumber = (number) => {
    return Number.isNaN(number) ? "0" : new Intl.NumberFormat("tr-TR").format(number)
  }

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Kapat"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Device List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {devices.map((device) => {
            const moduleParts = device.Modules.split("+")
            const moduleCount = moduleParts.length > 1 ? Number.parseInt(moduleParts[1], 10) + 1 : 1

            return (
              <div
                key={device.ID}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 shadow-md transition-all hover:shadow-lg"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                  {/* Device Image */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24">
                    <img
                      src={gristek_kutu}
                      alt={`Device ${device.DeviceNo}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>

                  {/* Device Info */}
                  <div className="flex-grow">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {device.LocationAt} - {device.DeviceNo}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaMapMarkerAlt className="mr-2" />
                        {device.City}, {device.Location}
                      </p>
                      <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaCube className="mr-2" />
                        {moduleCount} modül
                      </p>
                      <p className="flex items-center text-gray-600 dark:text-gray-300">
                        <FaWater className="mr-2" />
                        Tasarruf: {formatNumber(device.Savings)} L ({formatNumber(device.Savings / 10000)} m³)
                      </p>
                      <p className="flex items-center text-green-500">
                        <FaCheckCircle className="mr-2" />
                        Aktif
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardModal

