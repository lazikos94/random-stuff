function readURL(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();

            reader.onload = function (e) {
                $('#disimg')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
            
        }
} 
function getBase64Image(img) {
    // Create an empty canvas element
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    const dataURL = canvas.toDataURL("image/jpg");
    const image = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    return dataURL;
}
document.getElementById('submit').addEventListener('click',async ()=>{

        const firstname = document.getElementById('firstname').value;
        const surname = document.getElementById('surname').value;
        const age = document.getElementById('age').value;
        const image64 = getBase64Image(document.getElementById('disimg'));
        const data = { firstname,surname, age, image64};
        const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
        console.log(json);
        
});
