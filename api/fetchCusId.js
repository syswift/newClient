import { supabase } from '../api';

export const fetchCusId = async () =>{
    const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();
      //get all customer
      let all2 = {};

      if(processObj.body.currentProject)
      {
        all2 = await supabase.from('customer').select().match({
          processPer: processObj.body.name,
          projectName: processObj.body.currentProject
        });
      }
      else if(await processObj.body.auth_level === '管理')
      {
        all2 = await supabase.from('customer').select();
      }
      else{
        all2 = await supabase.from('customer').select().match({
          processPer: processObj.body.name
        });
      }

      return(all2);
}
