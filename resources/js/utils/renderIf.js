export default  (condition,template,fallback=null)=>(
    condition ? template : fallback
)