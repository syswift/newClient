import { supabase } from '../api';

export const fetchBox = async () =>{
    const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();
      //get all customer

      const all2 = await supabase.from('boxInfo').select();

      return(all2);
}
