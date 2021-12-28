// const SearchUser = (props) => {
//     const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
//         mode:"onChange",
//     });
//     const [searchTerm1, setSearchTerm1] = useState("");
//     const [searchTerm2, setSearchTerm2] = useState("");
//     const [searchTerm3, setSearchTerm3] = useState("");
   
//     return (
//         <>
//         <Input 
//             className="mt-3"
//             width='225px'
//             list="list1"
//             type="text"
//             placeholder="사용자 이름으로 추가"
//             name="User1"
//             onChange={(e) => {
//                 setSearchTerm1(e.target.value);
//             }} 
//         />
//         <Item w='230px'><datalist id ="list1">
//             {userData.filter((val1) => {
//                 if(searchTerm1 == ""){
//                     return val1
//                 }else if(val1.name.includes(searchTerm1)){
//                     return val1
//                 }
//             }).map((data,index) => ( <option key={index} value={data.name} />))}
//         </datalist ></Item>
//         <Input 
//             className="mt-3"
//             width='225px'
//             list="list2"
//             type="text"
//             placeholder="사용자 이름으로 추가"
//             name="User2"
//             onChange={(e) => {
//                 setSearchTerm2(e.target.value);
//             }} 
//         />
//         <Item w='230px'><datalist id ="list2">
//             {userData.filter((val) => {
//                 if(searchTerm2 == ""){
//                     return val
//                 }else if(val.name.includes(searchTerm2)){
//                     return val
//                 }
//             }).map((data,index) => ( <option key={index} value={data.name} />))}
//         </datalist ></Item>
//         <Input 
//             className="mt-3"
//             width='225px'
//             list="list3"
//             type="text"
//             placeholder="사용자 이름으로 추가"
//             name="User3"
//             onChange={(e) => {
//                 setSearchTerm3(e.target.value);
//             }} 
//         />
//         <Item w='230px'><datalist id ="list3">
//             {userData.filter((val) => {
//                 if(searchTerm3 == ""){
//                     return val
//                 }else if(val.name.includes(searchTerm3)){
//                     return val
//                 }
//             }).map((data,index) => ( <option key={index} value={data.name} />))}
//         </datalist ></Item>       
//         </>
//     );
// };