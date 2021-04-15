const ghPages = require('gh-pages');

ghPages.publish('public', {
    user: {
        name: "Kyle Andrews",
        email: "codingwithkyle@gmail.com",
    },
    repo: 'https://' + process.env.ACCESS_TOKEN +'@github.com/codewithkyle/card-designer-prototype.git',
    silent: true
}, (error)=>{
    if (error)
    {
        console.log(error);
    }
});