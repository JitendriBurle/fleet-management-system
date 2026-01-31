const supabase = require("../config/supabase");

const createTrip = async (req, res) => {
  const { customer_id, vehicle_id, passengers, distance_km, location } = req.body;

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", vehicle_id)
    .single();

  if (!vehicle.isAvailable)
    return res.status(400).json({ message: "Vehicle not available" });

  if (passengers > vehicle.allowed_passengers)
    return res.status(400).json({ message: "Passenger limit exceeded" });

  await supabase.from("vehicles")
    .update({ isAvailable: false })
    .eq("id", vehicle_id);

  const { data, error } = await supabase.from("trips").insert([{
    customer_id,
    vehicle_id,
    passengers,
    distance_km,
    location
  }]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

const getTrip = async (req, res) => {
  const { tripId } = req.params;
  const { data, error } = await supabase.from("trips").select("*").eq("id", tripId).single();
  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

const updateTrip = async (req, res) => {
  const { tripId } = req.params;
  const { data, error } = await supabase.from("trips").update(req.body).eq("id", tripId);
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

const deleteTrip = async (req, res) => {
  const { tripId } = req.params;
  await supabase.from("trips").delete().eq("id", tripId);
  res.json({ message: "Trip deleted" });
};

const endTrip = async (req, res) => {
  const { tripId } = req.params;

  const { data: trip } = await supabase
    .from("trips")
    .select("*, vehicles(rate_per_km)")
    .eq("id", tripId)
    .single();

  const cost = trip.distance_km * trip.vehicles.rate_per_km;

  await supabase.from("trips")
    .update({ isCompleted: true, tripCost: cost })
    .eq("id", tripId);

  await supabase.from("vehicles")
    .update({ isAvailable: true })
    .eq("id", trip.vehicle_id);

  res.json({ message: "Trip ended", cost });
};

module.exports = { createTrip, getTrip, updateTrip, deleteTrip, endTrip };
