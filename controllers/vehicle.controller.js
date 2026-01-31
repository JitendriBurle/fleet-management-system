const supabase = require('../config/supabase');

exports.addVehicle = async (req, res) => {
    try {
        const { user_id, role, name, registration_number, allowed_passengers, rate_per_km } = req.body;

        if(role !== 'owner') {
            return res.status(403).json({ message: 'Only owners can add vehicles.' });
        }

        const { data, error } = await supabase
            .from('vehicles')
            .insert([{ name, registration_number, allowed_passengers, rate_per_km, owner_id: user_id }])
            .select();

            if(error){
                throw error;
            }

            res.status(201).json(data[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.assignDriver = async (req, res) => {
    const {vehicle_id} = req.params;
    const {driver_id} = req.body;

    const {data, error} = await supabase
        .from('vehicles')
        .update({ driver_id })
        .eq('id', vehicle_id)
        .select();

        if(error){
            return res.status(500).json({ message: error.message });
        }
        res.json(data[0]);
};

exports.getVehicles = async (req, res) => {
    const {vehicleId} = req.params;
    const {data} = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', vehicleId).single();
    res.json(data);
};