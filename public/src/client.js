class Room {
    constructor() {
        this.walls = [];
        this.whiteboards = {};
        this.scene = document.createElement('a-scene');
        this.scene.setAttribute('position', '0 -2.5 0');

        this.assets = document.createElement('a-assets');
        this.scene.appendChild(this.assets);

        this.addImage('images/wood.jpg', 'wood');
        this.addImage('images/wallpaper.jpg', 'wallpaper');
        this.addModel('images/whiteboard/scene.gltf', 'whiteboard');
        this.addModel('images/sofa/scene.gltf', 'sofa');
        
        this.camera = document.createElement('a-entity');
        this.camera.setAttribute('position', '0 -4 -4');
        this.camera.appendChild(document.createElement('a-camera'));
        this.scene.appendChild(this.camera);
        
        const sky = document.createElement('a-sky');
        sky.setAttribute('color', '#666');
        this.scene.appendChild(sky);
        
        this.addWall('-3 -2.5 -4', '180 -90 0');
        this.addWall('3 -2.5 -4', '0 -90 0');
        this.addWall('0 -2.5 -1', '0 180 0');
        this.addWall('0 -2.5 -7', '0 0 0');

        const plane = document.createElement('a-plane');
        plane.setAttribute('position', '0 -5.5 -4');
        plane.setAttribute('rotation', '-90 0 0');
        plane.setAttribute('width', '6');
        plane.setAttribute('height', '6');
        plane.setAttribute('color', '#fff');
        plane.setAttribute('src', '#wood');
        plane.setAttribute('repeat', '20 20');
        this.scene.appendChild(plane);

        //const sofa = document.createElement('a-entity');
        //sofa.setAttribute('gltf-model', 'url(images/sofa/scene.gltf)');
        //sofa.setAttribute('scale', '0.007 0.007 0.007');
        //sofa.setAttribute('position', '15.7 -5.5 -33');
        //sofa.setAttribute('rotation', '0 180 0');
        //this.scene.appendChild(sofa);

        this.addProjectBoard(123);
        this.addTicketToProject(123, 'test');
        this.addTicketToProject(123, 'test2');
        this.addTicketToProject(123, 'test3');
        this.addTicketToProject(123, 'test4');
        this.addTicketToProject(123, 'test5');
    }

    addWall(position, rotation) {
        const wall = document.createElement('a-plane');
        wall.setAttribute('position', position);
        wall.setAttribute('rotation', rotation);
        wall.setAttribute('width', '6');
        wall.setAttribute('height', '6');
        wall.setAttribute('color', '#fff');
        wall.setAttribute('src', '#wallpaper');
        wall.setAttribute('repeat', '20 20');
        wall.setAttribute('id', 'wall' + this.walls.length);
        this.scene.appendChild(wall);
        this.walls.push(wall);

    }

    getScene() {
        return this.scene;
    }

    addImage(img, id) {
        const image = document.createElement('img');
        image.setAttribute('src', img);
        image.setAttribute('id', id);

        this.assets.appendChild(image);
    }

    addModel(filename, id) {
        const model = document.createElement('a-asset-item');
        model.setAttribute('src', filename);
        model.setAttribute('id', id);

        this.assets.appendChild(model);
    }

    addProjectBoard(project_id) {
        const whiteboard = document.createElement('a-entity');
        whiteboard.setAttribute('gltf-model', 'url(images/whiteboard/scene.gltf)');
        whiteboard.setAttribute('id', 'project-' + project_id);
        whiteboard.setAttribute('scale', '0.25 0.25 0.25');
        whiteboard.setAttribute('position', '0 -4 -5');
        this.scene.appendChild(whiteboard);

        this.whiteboards[project_id] = {
            model: whiteboard,
            tickets: []
        }
    }

    addTicketToProject(project_id, ticket_title) {
        const post_it_note_colours = ['#ff7eb9', '#ff65a3', '#7afcff', '#feff9c', '#fff740'];
        const start_position_x = -0.8;
        const start_position_y = 6.6;
        const start_position_d = -0.15; 

        const ticket_width = 1;
        const ticket_height = 1;

        let whiteboard = this.whiteboards[project_id];
        const ticket = document.createElement('a-entity');

        ticket.setAttribute('geometry', "primitive: plane; width: "+ticket_width+"; height: "+ticket_height);

        const offset = Math.random()*0.1;
        const rotate = this.random(-10, 10);
        const x = start_position_x + ((ticket_width + 0.1) * whiteboard.tickets.length) - offset;
        const y = start_position_y;
        const d = start_position_d;

        ticket.setAttribute('position', x + " " + y + " " + d);
        ticket.setAttribute('rotation', '0 0 ' + rotate);

        ticket.setAttribute('material', 'color: ' + post_it_note_colours[Math.floor(Math.random() * post_it_note_colours.length)]); 
        ticket.setAttribute("text", 'value: ' + ticket_title + '; width: 1; color: #000');
        ticket.setAttribute('id', 'ticket-' + whiteboard.tickets.length + '-' + project_id);
        whiteboard.model.appendChild(ticket); 
        whiteboard.tickets.push(ticket);
    }

    random(min, max) {
        return Math.floor(min + Math.random()*(max+1 - min));
    }

}

const room = new Room();
document.body.appendChild(room.getScene());
