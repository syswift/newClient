import { supabase } from '../api';

export const fetchTermId = async () =>{
    const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();
      //get all terminal
      let all2 = {};

      if(processObj.body.currentProject)
      {
        all2 = await supabase.from('terminal').select().match({
          processPer: processObj.body.name,
          projectName: processObj.body.currentProject
        });
      }
      else if(await processObj.body.auth_level === '管理')
      {
        all2 = await supabase.from('terminal').select();
      }
      else{
        all2 = await supabase.from('terminal').select().match({
          processPer: processObj.body.name
        });
      }

      return(all2);
}
