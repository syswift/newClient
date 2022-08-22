import { supabase } from '../api';

export const fetchTable = async (table, id = '') =>{
    const processObj = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();
      //get all customer
      let all2 = {};
     
      if(id === '')
      {
        if(processObj.body.currentProject)
        {
          all2 = await supabase.from(table).select().match({
            processPer: processObj.body.name,
            projectName: processObj.body.currentProject
          });
        }
        else if(await processObj.body.auth_level === '管理')
        {
          all2 = await supabase.from(table).select();
        }
        else{
          all2 = await supabase.from(table).select().match({
            processPer: processObj.body.name
          });
        }
      }
      else{
        if(processObj.body.currentProject)
        {
          all2 = await supabase.from(table).select().match({
            processPer: processObj.body.name,
            projectName: processObj.body.currentProject,
            id: id
          }).single();
        }
        else if(await processObj.body.auth_level === '管理')
        {
          all2 = await supabase.from(table).select().match({
            id: id
          }).single();
        }
        else{
          all2 = await supabase.from(table).select().match({
            processPer: processObj.body.name,
            id: id
          }).single();
        }
      }

      return(all2);
}
