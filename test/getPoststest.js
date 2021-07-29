const chai = require('chai')
const superTest = require('supertest');
const chaiSorted = require('chai-sorted')

let server = require('../app');
let expect = chai.expect();

chai.should();
chai.use(chaiSorted);


//using chai-http and supertest
//group tests
describe('GET all hatchways posts', () => {

    //TEST GET ROUTE TO ALL POSTS
    describe("GET /api/posts with tags", ()=>{
        it('it should get posts with tag query params', async () => {
            superTest(server)
                .get('/api/posts')
                .then((res)=>{
                    res.should.have.status(200)
                    res.body.data.should.be.an('object')
                    res.body.data.message.to.be.eql('Gotten posts')
                    res.body.should.have.property('tags')
                    expect(res.body.data).to.be.an('array').that.contains.something.like({authorId: 7, tags:["science", "tech"]}); 
            })
        });

        it('it should NOT get posts with tag query params', async () => {
            superTest(server)
                .get('/api/post')
                .then((res)=>{
                    res.should.have.status(404)
            })
        });
    })


    it('should get posts with tag query params by the key its sorted by, default ascending order', () => {
        superTest(server)
            .get('/api/posts')
            .expect(200)
            .then((res)=>{
                expect(res.headers.location).to.be.eql('/api/posts')
                expect(res.body.data).to.be.an('array').that.contains.something.like({authorId: 7, tags:["science", "tech"]});
                expect(res.body.data).to.be.sortedBy("id", {ascending: true})
            })
    })

    it('should get posts with tag query params by the key its sorted by, descending order', () => {
        superTest(server)
            .get('/api/posts')
            .expect(200)
            .then((res)=>{
                expect(res.headers.location).to.be.eql('/api/posts')
                expect(res.body.data).to.be.an('array').that.contains.something.like({id:1 ,authorId: 7, tags:["science", "tech"]});
                expect(res.body.data).to.be.sortedBy("id", {descending: true})
            })
    })


    it('should get posts with tag query params by the reads key, default ascending order', () => {
        superTest(server)
            .get('/api/posts')
            .expect(200)
            .then((res)=>{
                expect(res.headers.location).to.be.eql('/api/posts')
                expect(res.body.data).to.be.an('array').that.contains.something.like({authorId: 7, tags:["science", "tech"]});
                expect(res.body.data).to.be.sortedBy("reads", {ascending: true})
                res.body.should.have.property('reads')
            })
    })

    it('should get posts with tag query params by the likes key, default ascending order', () => {
        superTest(server)
            .get('/api/posts')
            .expect(200)
            .then((res)=>{
                expect(res.headers.location).to.be.eql('/api/posts')
                expect(res.body.data).to.be.an('array').that.contains.something.like({authorId: 7, tags:["science", "tech"]});
                expect(res.body.data).to.be.sortedBy("likes", {ascending: true})

            })
    })

    it('should get posts with tag query params by the popularity key, default ascending order', () => {
        superTest(server)
            .get('/api/posts')
            .expect(200)
            .then((res)=>{
                expect(res.headers.location).to.be.eql('/api/posts')
                expect(res.body.data).to.be.an('array').that.contains.something.like({authorId: 7, tags:["science", "tech"]});
                expect(res.body.data).to.be.sortedBy("popularity", {ascending: true})

            })
    })

});