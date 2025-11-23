import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "../features/orders/orderSlice";
import { User, Package, Clock, MapPin } from "lucide-react";
import Loader from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { myOrders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchMyOrders());
    }
  }, [dispatch, user, navigate]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Left: User Info Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4 text-indigo-600">
              <User size={40} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user?.name}</h2>
            <p className="text-gray-500">{user?.email}</p>
            <div className="mt-6 w-full border-t pt-4 text-left">
              <p className="text-sm text-gray-500 mb-2">Account Type:</p>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  user?.isAdmin
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user?.isAdmin ? "Administrator" : "Customer"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Order History */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Package className="text-indigo-600" /> Order History
          </h2>

          {myOrders.length === 0 ? (
            <div className="bg-white p-8 rounded-xl shadow-sm text-center border border-gray-100">
              <p className="text-gray-500 mb-4">
                You haven't placed any orders yet.
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {myOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap justify-between items-center border-b pb-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                        Order ID
                      </p>
                      <p className="font-mono text-sm text-gray-700">
                        #{order._id}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                        Date
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Clock size={14} />{" "}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <StatusBadge status={order.status} />
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <img
                          src={
                            item.product?.image || "https://placehold.co/100"
                          }
                          alt={item.product?.name}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {item.product?.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Size: {item.size} • Color: {item.color} • Qty:{" "}
                            {item.quantity}
                          </p>
                        </div>
                        <div className="font-bold text-gray-700">
                          ৳{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer: Total & Address */}
                  <div className="mt-4 pt-4 border-t flex flex-wrap justify-between items-end bg-gray-50 -mx-6 -mb-6 p-4 rounded-b-xl">
                    <div className="text-sm text-gray-600 flex items-start gap-2 max-w-md">
                      <MapPin size={16} className="mt-0.5 text-indigo-500" />
                      <span>{order.shippingInfo.address}</span>
                    </div>
                    <div className="text-xl font-bold text-indigo-600">
                      Total: ৳{order.totalPrice}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
        styles[status] || "bg-gray-100"
      }`}
    >
      {status}
    </span>
  );
};

export default ProfilePage;
