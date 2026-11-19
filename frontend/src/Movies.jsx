import OneMovie from "./Onemovie"

const Movies= ()=> {
        const data = [
        {
            index:"1",
            title: "Krishnavataram",
            category: "Action / Drama",
            image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4xLzEwICAyMy43SysgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00495498-mcqealqwgs-portrait.jpg"
        },

        {
            index:"2",
            title: "Michael",
            category: "Action / Drama",
            image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS4zLzEwICA4NC4xSysgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00470110-awdekyqwkw-portrait.jpg"
        },

        {
            index:"3",
            title: "Veerabadhrudu",
            category: "Action / Drama",
            image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@like_202006280402.png,lx-24,ly-617,w-29,l-end:l-text,ie-MzAuNksrIExpa2Vz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00455003-lsyvrbnrtu-portrait.jpg"
        },

        {
            index:"4",
            title: "Drishyam 3",
            category: "Action / Drama",
            image: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC41LzEwICA1NC43SysgVm90ZXM%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00487295-eazqztcqeg-portrait.jpg"
        },
        {
            index:"5",
            title:"Star Wars",
            category:"Action / Adventure",
            image:"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC,e-usm-2-2-0.5-0.008:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OC41LzEwICAxLjRLKyBWb3Rlcw%3D%3D,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00464023-empcmlhfza-portrait.jpg"
        }
     ];

     return( 
      <section className="movies">
        <h1> Latest Movies</h1>
        {
            data.map(( movie, index) =>{
                return(
                    <OneMovie key={index} title={movie.title} category={movie.category} image={movie.image}/>
                )

            })
        }
         </section>
         )
        }
       

export default Movies