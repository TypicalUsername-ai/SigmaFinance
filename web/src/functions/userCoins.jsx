import { SupabaseClient } from "@supabase/supabase-js";

/**
 * 
 * @param {SupabaseClient} supabase 
 */
export const getTrackedIndices = async(supabase) => {

    const user = await supabase.auth.getUser();

    let { data, error } = await supabase
        .from('actions')
        .select('*')
        .eq('initiator_id', user.data.user.id)
        .eq('target_type', true)
        .eq('action_type', 1)
        .order('occured_at', { ascending: false });

    if(error != null) {
        throw error;
    } else {
        return data;
    }
}

/**
 * 
 * @param {SupabaseClient} supabase 
 */
export const getFavouriteIndex = async(supabase) => {

    const user = await supabase.auth.getUser();

    let { data, error } = await supabase
        .from('actions')
        .select('*')
        .eq('initiator_id', user.data.user.id)
        .eq('target_type', true)
        .eq('action_type', 0)
        .order('occured_at', { ascending: false });

    if(error != null) {
        throw error;
    } else {
        return data;
    }
}

/**
 * 
 * @param {SupabaseClient} supabase 
 */
export const canIndexBeFollowed = async(supabase, _target_id) => {

    const user = await supabase.auth.getUser();

    let trackedIndices = await getTrackedIndices(supabase);
    let favouriteIndex = await getFavouriteIndex(supabase);
    if(trackedIndices.some(obj => obj.target_id == _target_id) ||
        favouriteIndex.target_id == _target_id) {
        return false;
    } else {
        return true;
    }
}

/**
 * 
 * @param {SupabaseClient} supabase 
 */
export const makeObjectFavourite = async(supabase, target_id) => {

    const user = await supabase.auth.getUser();

    let { data, error } = await supabase
        .from('actions')
        .update({ action_type: 0 })
        .eq('initiator_id', user.data.user.id)
        .eq('target_id', target_id)
        .select();
    
    if(error != null) {
        throw error;
    } else {
        console.log("data from function", data)
        return data;
    }
}

/**
 * 
 * @param {SupabaseClient} supabase 
 */
export const makeObjectUnFavourite = async(supabase, target_id) => {

    const user = await supabase.auth.getUser();

    let { data, error } = await supabase
        .from('actions')
        .update({ action_type: 1 })
        .eq('initiator_id', user.data.user.id)
        .eq('target_id', target_id)
        .select();
    console.log(data)
    if(error != null) {
        throw error;
    } else {
        return data;
    }
}

/**
 * 
 * @param {SupabaseClient} supabase 
 */
export const makeObjectTracked = async(supabase, _target_type, _target_id) => {
    const user = await supabase.auth.getUser();
    console.log(_target_id)

    let { data, error } = await supabase
        .from('actions')
        .select('*')
        .eq('target_type', _target_type)
        .eq('initiator_id', user.data.user.id)
        .eq('target_id', _target_id)
        .select();
        
    console.log("data", data);
    if(data[0] == null){
       let { data, error } = await supabase
        .from('actions')
        .insert({
            initiator_id: user.data.user.id,
            target_type: _target_type,
            target_id: _target_id,
            action_type: 1
        })
        .select(); 

        if(error != null) {
            throw error;
        } else {
            window.location.reload()
            return data;
        } 
    } else{
        let { data, error } = await supabase
        .from('actions')
        .update({ action_type: 1 })
        .eq('initiator_id', user.data.user.id)
        .eq('target_id', _target_id)
        .select();

        if(error != null) {
            throw error;
        } else {
            window.location.reload()
            return data;
        } 
     } 
}

/**
 * 
 * @param {SupabaseClient} supabase 
 */
export const makeObjectUnTracked = async(supabase, target_id) => {
    const user = await supabase.auth.getUser();
    console.log(target_id)
    let { data, error } = await supabase
        .from('actions')
        .update({ action_type: -1 })
        .eq('initiator_id', user.data.user.id)
        .eq('target_id', target_id)
        .select();

    if(error != null) {
        throw error;
    } else {
        window.location.reload()
        return data;
    }
}

