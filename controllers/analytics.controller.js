const supabase = require('../config/supabase');

exports.analytics = async (req, res) => {
    const customers = await supabase.from('users').select('*', {count: 'exact', head:true}).eq('role', 'customer');
    const owners = await supabase.from('users').select('*', {count: 'exact', head:true}).eq('role', 'owner');
    const drivers = await supabase.from('users').select('*', {count: 'exact', head:true}).eq('role', 'driver');
    const vehicles = await supabase.from('vehicles').select('*', {count: 'exact', head:true});
    const trips = await supabase.from('trips').select('*', {count: 'exact', head:true});

    res.json({
        customers: customers.count,
        owners: owners.count,
        drivers: drivers.count,
        vehicles: vehicles.count,
        trips: trips.count
    });
};