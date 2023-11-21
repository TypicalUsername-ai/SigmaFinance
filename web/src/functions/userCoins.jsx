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

export const makeObjectFavourite = async(supabase, target_id) => {

    const user = await supabase.auth.getUser();

    console.log(target_id)
    // let { data, error } = await supabase
    //     .from('actions')
    //     .select('*')
    //     .eq('initiator_id', user.data.user.id)
    //     .eq('target_id', target_id)
    // console.log(data)
    let { data, error } = await supabase
        .from('actions')
        .update({ action_type: 0 })
        .eq('initiator_id', user.data.user.id)
        .eq('target_id', target_id)
        .select();
    console.log(data)
    if(error != null) {
        throw error;
    } else {
        // console.log(data)
        return data;
    }
}