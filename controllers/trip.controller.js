const supabase = require('../config/supabase');

exports.createTrip = async (req, res) => {
    try {
    const { customer_id, role, vehicle_id, passengers, distance_km } = req.body;
    if(role !== 'customer') {
        return res.status(403).json({ message: 'Only customers can create trips.' });
    }

    const { data: vehicle} = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicle_id)
        .single();

        if(!vehicle.isAvailable) {
            return res.status(400).json({ message: 'Vehicle is not available.' });
        }
    if(passengers > vehicle.allowed_passengers) {
        return res.status(400).json({ message: 'Number of passengers exceeds allowed limit.' });
    }
    const { data, error } = await supabase.from('trips').insert([{
        customer_id,
        vehicle_id,
        passengers,
        distance_km
    }]).select();

    await supabase.from('vehicles').update({ isAvailable: false }).eq('id', vehicle_id);

    if(error) {
        throw error;
    }
    res.status(201).json(data[0]);
} catch (err) {
    res.status(400).json({ message: err.message });
}
};

exports.endTrip = async (req, res) => {
    const { trip_id } = req.params;

    const { data: trip } = await supabase
        .from('trips')
        .select('*, vehicles(rate_per_km)')
        .eq('id', trip_id)
        .single();

        const cost = trip.distance_km * trip.vehicles.rate_per_km;

        await supabase.from('trips')
        .update({ isCompleted: true, tripCost: cost })
        .eq('id', trip_id);

        await supabase.from('vehicles')
        .update({ isAvailable: true })
        .eq('id', trip.vehicle_id);

        res.json({ message: 'Trip ended.', tripCost: cost });

};