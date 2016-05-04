declare module spine {
    var degRad: number;
    var radDeg: number;

    class Float32Array {
        constructor(...args: any[]);
    }
    class Uint32Array {
        constructor(...args: any[]);
    }
    class Uint16Array {
        constructor(...args: any[]);
    }

    var temp: Float32Array;

    enum BlendMode {
        normal,
        additive,
        multiply,
        screen
    }

    class BoneData {
        public name: string;
        public parent: Bone;

        public length: number;
        public x: number;
        public y: number;
        public rotation: number;
        public scaleX: number;
        public scaleY: number;
        public inheritScale: boolean;
        public inheritRotation: boolean;

        constructor(name: string, parent: Bone);
    }

    class SlotData {
        public name: string;
        public boneData: BoneData;
        
        public r: number;
        public g: number;
        public b: number;
        public a: number;
        public attachmentName: string;
        public blendMode: BlendMode;
        
        constructor(name: string, boneData: BoneData);
    }

    class IkConstraintData {
        public name: string;
        public bones: Bone[];

        public target: Bone;
        public bendDirection: number;
        public mix: number;

        constructor(name: string);
    }

    class TransformConstraintData {
        public name: string;

        public bone: Bone;
        public target: Bone;
        public translateMix: number;
        public x: number;
        public y: number;

        constructor(name: string);
    }

    class Bone {
        public data: BoneData;
        public skeleton: Skeleton;
        public parent: Bone;

        static yDown: boolean;

        public x: number;
        public y: number;
        public rotation: number;
        public scaleX: number;
        public scaleY: number;
        public a: number;
        public b: number;
        public worldX: number;
        public c: number;
        public d: number;
        public worldY: number;
        public worldSignX: number;
        public worldSignY: number;

        constructor(boneData: BoneData, skeleton: Skeleton, parent: Bone);

        public update(): void;
        public updateWorldTransformWith(): void;
        public updateWorldTransform(x: number, y: number, rotation: number, scaleX: number, scaleY: number): void;
        public setToSetupPose(): void;
        public getWorldRotationX(): number;
        public getWorldRotationY(): number;
        public getWorldScaleX(): number;
        public getWorldScaleY(): number;
        public worldToLocal(world: any): any;
        public localToWorld(local: any): any;
    }

    class Slot {
        public data: SlotData;
        public bone: Bone;
        public attachmentVertices: Float32Array;

        public r: number;
        public g: number;
        public b: number;
        public a: number;
        private _attachmentTime: number;
        public attachment: Attachment;

        constructor(slotData: SlotData, bone: Bone);

        public setAttachment(attachment: Attachment): void;
        public setAttachmentTime(time: number): void;
        public getAttachmentTime(): Attachment;
        public setToSetupPose(): void;
    }

    class IkConstraint {
        public data: any;
        public mix: any;
        public bendDirection: number;
        public bones: Bone[];
        public target: Bone;
        
        constructor(data: any, skeleton: Skeleton);
        
        public update(): void;
        public apply(): void;
        
        public static apply1(bone: Bone, targetX: number, targetY: number, alpha: number): void;
        public static apply2(parent: any, child: any, targetX: number, targetY: number, bendDir: number, alpha: number): void;
    }

    class TransformConstraint {
        public data: any;
        
        public translateMix: any;
        public x: number;
        public y: number;
        public bone: Bone;
        public target: Bone;
        
        constructor(data: any, skeleton: Skeleton);
        
        public apply(): void;
        public update(): void;
    }

    class Skin {
        public name: string;
        public attachments: any;
        
        constructor(name: string);
        
        public addAttachment(slotIndex: string, name: string, attachment: Attachment): void;
        public getAttachment(slotIndex: string, name: string): any;
        private _attachAll(skeleton: Skeleton, oldSkin: Skin);
    }

    class Animation {
        public name: string;
        public timelines: TimeLine;
        public duration: number;

        constructor(name: string, timelines: TimeLine, duration: number);
        public apply(skeleton: Skeleton, lastTime: number, time: number, loop: boolean, events: any): void;
        public mix(skeleton: Skeleton, lastTime: number, time: number, loop: boolean, events: any, alpha: number): void;

        public static binarySearch(values: number[], target: number, step: number): any;
        public static binarySearch1(values: number[], target: number): any;
        public static linearSearch(values: number[], target: number, step: number): number;
    }

    class Curves {
        public curves: Float32Array;

        constructor(frameCount: number);

        public setLinear(frameIndex: number): void;
        public setStepped(frameIndex: number): void;
        /** Sets the control handle positions for an interpolation bezier curve used to transition from this keyframe to the next.
         * cx1 and cx2 are from 0 to 1, representing the percent of time between the two keyframes. cy1 and cy2 are the percent of
         * the difference between the keyframe's values. */
        public setCurve(frameIndex: number, cx1: number, cy1: number, cx2: number, cy2: number): void;
        public getCurvePercent(frameIndex: number, percent: number): number;
    }

    class SkeletonData {
        public bones: BoneData[];
        public slots: SlotData[];
        public skins: Skin[];
        public events: EventData[];
        public animations: Animation[];
        public ikConstraints: IkConstraintData[];
        public transformConstraints: TransformConstraintData[];

        public name: string;
        public defaultSkin: Skin;
        public width: number;
        public height: number;
        public version: number;
        public hash: string;

        constructor();

        /** @return May be null. */
        public findBone(boneName: string): spine.BoneData;
        /** @return -1 if the bone was not found. */
        public findBoneIndex(boneName: string): number;
        /** @return May be null. */
        public findSlot(slotName: string): spine.SlotData;
        /** @return -1 if the bone was not found. */
        public findSlotIndex(slotName: string): number;
        /** @return May be null. */
        public findSkin(skinName: string): spine.Skin;
        /** @return May be null. */
        public findEvent(eventName: string): spine.EventData;
        /** @return May be null. */
        public findAnimation(animationName: string): Animation;
        public findIkConstraint(constraintName: string): IkConstraint;
        public findTransformConstraints(constraintName: string): TransformConstraintData;
    }

    class Skeleton {
        public bones: Bone[];
        public slots: Slot[];
        public drawOrder: any[];
        public ikConstraints: IkConstraint[];
        public transformConstraints: TransformConstraint[];
        public data: SkeletonData;
        public cache: any[];

        public x: number;
        public y: number;
        public skin: Skin;
        public r: number;
        public g: number;
        public b: number;
        public a: number;
        public time: number;
        public flipX: boolean;
        public flipY: boolean;

        constructor(skeletonData: SkeletonData);

        public updateCache(): void;
        /** Updates the world transform for each bone. */
        public updateWorldTransform(): void;
        /** Sets the bones and slots to their setup pose values. */
        public setToSetupPose(): void;
        public setBonesToSetupPose(): void;
        public setSlotsToSetupPose(): void;
        /** @return May return null. */
        public getRootBone(): spine.Bone;
        /** @return May be null. */
        public findBone(boneName: any): spine.Bone;
        /** @return -1 if the bone was not found. */
        public findBoneIndex(boneName: any): number;
        /** @return May be null. */
        public findSlot(slotName: any): spine.Slot;
        /** @return -1 if the bone was not found. */
        public findSlotIndex(slotName: any): number;
        public setSkinByName(skinName: any): void;
        /** Sets the skin used to look up attachments not found in the {@link SkeletonData#getDefaultSkin() default skin}. Attachments
         * from the new skin are attached if the corresponding attachment from the old skin was attached.
         * @param newSkin May be null. */
        public setSkin(newSkin: any): void;
        /** @return May be null. */
        public getAttachmentBySlotName(slotName: any, attachmentName: any): any;
        /** @return May be null. */
        public getAttachmentBySlotIndex(slotIndex: any, attachmentName: any): any;
        public setAttachment(slotName: any, attachmentName: any): void;
        public findIkConstraint(constraintName: string): IkConstraint;
        public findTransformConstraint(constraintName: string): TransformConstraint;
        public update(delta: number): void;
    }

    class EventData {
        public name: string;

        constructor(name: string);

        public intValue: number;
        public floatValue: number;
        public stringValue: string;
    }

    class Event {
        public data: any;
        public time: number;

        constructor(time: number, data: any);

        public intValue: number;
        public floatValue: number;
        public stringValue: string;
    }

    enum AttachmentType {
        region,
        boundingbox,
        mesh,
        weightedmesh,
        linkedmesh,
        weightedlinkedmesh
    }

    interface Attachment {
        name: string;
        type: AttachmentType
    }

    class RegionAttachment implements Attachment {
        public name: string;
        public offset: Float32Array;
        public uvs: Float32Array;

        public type: AttachmentType;
        public x: number;
        public y: number;
        public rotation: number;
        public scaleX: number;
        public scaleY: number;
        public width: number;
        public height: number;
        public r: number;
        public g: number;
        public b: number;
        public a: number;
        public path: any;
        public rendererObject: any;
        public regionOffsetX: number;
        public regionOffsetY: number;
        public regionWidth: number;
        public regionHeight: number;
        public regionOriginalWidth: number;
        public regionOriginalHeight: number;

        constructor(name: string);

        public setUVs(u: any, v: any, u2: any, v2: any, rotate: any): void;
        public updateOffset(): void;
        public computeVertices(x: any, y: any, bone: any, vertices: any): void;
    }


    class MeshAttachment implements Attachment {
        public name: string;
        public type: AttachmentType;
        public vertices: any[];
        public uvs: any[];
        public regionUVs: any[];
        public triangles: any[];
        public hullLength: number;
        public r: number;
        public g: number;
        public b: number;
        public a: number;
        public path: any;
        public inheritFFD: boolean;
        public parentMesh: any;
        public rendererObject: any;
        public regionU: number;
        public regionV: number;
        public regionU2: number;
        public regionV2: number;
        public regionRotate: boolean;
        public regionOffsetX: number;
        public regionOffsetY: number;
        public regionWidth: number;
        public regionHeight: number;
        public regionOriginalWidth: number;
        public regionOriginalHeight: number;
        public edges: any;
        public width: number;
        public height: number;

        constructor(name: string);

        public updateUVs(): void;
        public setParentMesh(parentMesh: any): void;
        public computeWorldVertices(x: any, y: any, slot: any, worldVertices: any): void;
    }

    class WeightedMeshAttachment implements Attachment {
        public name: string;
        public type: AttachmentType;
        public bones: any[];
        public uvs: any[];
        public regionUVs: any[];
        public triangles: any[];
        public hullLength: number;
        public r: number;
        public g: number;
        public b: number;
        public a: number;
        public path: any;
        public inheritFFD: boolean;
        public parentMesh: any;
        public rendererObject: any;
        public regionU: number;
        public regionV: number;
        public regionU2: number;
        public regionV2: number;
        public regionRotate: boolean;
        public regionOffsetX: number;
        public regionOffsetY: number;
        public regionWidth: number;
        public regionHeight: number;
        public regionOriginalWidth: number;
        public regionOriginalHeight: number;
        public edges: any;
        public width: number;
        public height: number;

        constructor(name: string);

        public updateUVs(u: any, v: any, u2: any, v2: any, rotate: any): void;
        public setParentMesh(parentMesh: any): void;
        public computeWorldVertices(x: any, y: any, slot: any, worldVertices: any): void;
    }

    class BoundingBoxAttachment implements Attachment {
        public name: string;
        public type: AttachmentType;
        public vertices: any[];

        constructor(name: string);

        public computeWorldVertices(x: any, y: any, bone: any, worldVertices: any): void;
    }

    interface TimeLine {
        frames: Float32Array;

        getFrameCount(): number;
        setFrame(...args: any[]): void;
        apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: number): void;
    }

    class RotateTimeline implements TimeLine {
        public boneIndex: number;
        public curves: Curves;
        public frames: Float32Array;

        constructor(frameCount: number);

        public getFrameCount(): number;
        public setFrame(frameIndex: number, time: number, angle: number): void;
        public apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: number): void;
    }

    class TranslateTimeline implements TimeLine {
        public boneIndex: number;
        public curves: Curves;
        public frames: Float32Array;

        constructor(frameCount: number);

        public getFrameCount(): number;
        public setFrame(frameIndex: any, time: any, x: any, y: any): void;
        public apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: number): void;
    }

    class ScaleTimeline implements TimeLine {
        public boneIndex: number;
        public curves: Curves;
        public frames: Float32Array;

        constructor(frameCount: number);

        public getFrameCount(): number;
        public setFrame(frameIndex: any, time: any, x: any, y: any): void;
        public apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: number): void;
    }

    class ColorTimeline implements TimeLine {
        public slotIndex: number;
        public curves: Curves;
        public frames: Float32Array;

        constructor(frameCount: number);

        public getFrameCount(): number;
        public setFrame(frameIndex: number, time: number, r: number, g: number, b: number, a: number): void;
        public apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: number): void;
    }

    class AttachmentTimeline implements TimeLine {
        public slotIndex: number;
        public curves: Curves;
        public frames: Float32Array;
        public attachmentNames: string[];

        constructor(frameCount: number);

        public getFrameCount(): number;
        public setFrame(frameIndex: number, time: number, attachmentName: string): void;
        public apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: number): void;
    }

    class EventTimeline implements TimeLine {
        public frames: Float32Array;
        public events: any[];

        constructor(frameCount: number);

        public getFrameCount(): number;
        public setFrame(frameIndex: any, event: any): void;
        /** Fires events for frames > lastTime and <= time. */
        public apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: any): void;
    }

    class DrawOrderTimeline implements TimeLine {
        public frames: Float32Array;
        public drawOrders: any[];

        constructor(frameCount: number);

        public getFrameCount(): number;
        public setFrame(frameIndex: any, time: any, drawOrder: any): void;
        public apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: any): void;
    }

    class FfdTimeline implements TimeLine {
        public curves: Curves;
        public frames: Float32Array;
        public frameVertices: any[];

        slotIndex: number;
        attachment: number;

        constructor(frameCount: number);

        public getFrameCount(): number;
        public setFrame(frameIndex: any, time: any, vertices: any): void;
        public apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: any): void;
    }

    class IkConstraintTimeline implements TimeLine {
        public frames: Float32Array;
        public curves: Curves;

        constructor(frameCount: number);

        public getFrameCount(): number;
        public setFrame(frameIndex: any, time: any, mix: any, bendDirection: number): void;
        public apply(skeleton: Skeleton, lastTime: number, time: number, firedEvents: any, alpha: any): void;
    }

    class AnimationStateData {
        public skeletonData: SkeletonData;
        public animationToMixTime: any;
        public defaultMix: number;

        constructor(skeletonData: SkeletonData);

        public setMixByName(fromName: any, toName: any, duration: any): void;
        public setMix(from: any, to: any, duration: any): void;
        public getMix(from: any, to: any): any;
    }

    class TrackEntry {
        public next: any;
        public previous: any;
        public animation: any;
        public loop: boolean;
        public delay: number;
        public time: number;
        public lastTime: number;
        public endTime: number;
        public timeScale: number;
        public mixTime: number;
        public mixDuration: number;
        public onStart: any;
        public onEnd: any;
        public onComplete: any;
        public onEvent: any;
    }

    class AnimationState {
        public data: spine.AnimationStateData;
        public tracks: any[];
        public events: spine.Event[];
        public onStart: any;
        public onEnd: any;
        public onComplete: any;
        public onEvent: any;
        public timeScale: number;
        constructor(data: spine.AnimationStateData);
        public update(delta: any): void;
        public apply(skeleton: spine.Skeleton): void;
        public clearTracks(): void;
        public clearTrack(trackIndex: any): void;
        private _expandToIndex(index);
        public setCurrent(index: any, entry: any): void;
        public setAnimationByName(trackIndex: any, animationName: any, loop: any): void;
        /** Set the current animation. Any queued animations are cleared. */
        public setAnimation(trackIndex: any, animation: any, loop: any): spine.TrackEntry;
        public addAnimationByName(trackIndex: any, animationName: any, loop: any, delay: any): void;
        /** Adds an animation to be played delay seconds after the current or last queued animation.
         * @param delay May be <= 0 to use duration of previous animation minus any mix duration plus the negative delay. */
        public addAnimation(trackIndex: any, animation: any, loop: any, delay: any): spine.TrackEntry;
        /** May be null. */
        public getCurrent(trackIndex: any): any;
    }

    class SkeletonJson {
        public attachmentLoader: any;
        public scale: number;
        constructor(attachmentLoader: any);
        public readCurve(timeline: any, frameIndex: any, valueMap: any): void;
        public toColor(hexString: any, colorIndex: any): number;
        public readSkeletonData(root: any): SkeletonData;
        public readAttachment(skin: any, name: any, map: any): any;
        public readAnimation(name: any, map: any, skeletonData: any): void;
        public getFloatArray(map: any, name: any, scale: number): Float32Array;
        public getUint32Array(map: any, name: any): Uint32Array;
        public getUint16Array(map: any, name: any): Uint16Array;
    }

    class Atlas {
        public textureLoader: any;
        public pages: any[];
        public regions: any[];

        static Format: {
            alpha: number;
            intensity: number;
            luminanceAlpha: number;
            rgb565: number;
            rgba4444: number;
            rgb888: number;
            rgba8888: number;
        };

        static TextureFilter: {
            nearest: number;
            linear: number;
            mipMap: number;
            mipMapNearestNearest: number;
            mipMapLinearNearest: number;
            mipMapNearestLinear: number;
            mipMapLinearLinear: number;
        };

        static TextureWrap: {
            mirroredRepeat: number;
            clampToEdge: number;
            repeat: number;
        };
        constructor(atlasText: any, textureLoader: any);
        public findRegion(name: any): any;
        public dispose(): void;
        public updateUVs(page: any): void;
    }

    class AtlasPage {
        public name: any;
        public format: any;
        public minFilter: any;
        public magFilter: any;
        public uWrap: any;
        public vWrap: any;
        public rendererObject: any;
        public width: any;
        public height: any;
    }

    class AtlasAttachmentLoader {
        public atlas: any;
        constructor(atlas: any);
        public newAttachment(skin: any, type: any, name: any): any;
    }

    class AtlasRegion {
        public page: any;
        public name: any;
        public x: number;
        public y: number;
        public width: number;
        public height: number;
        public u: number;
        public v: number;
        public u2: number;
        public v2: number;
        public offsetX: number;
        public offsetY: number;
        public originalWidth: number;
        public originalHeight: number;
        public index: number;
        public rotate: boolean;
        public splits: any;
        public pads: any;
    }

    class AtlasReader {
        private lines;
        private index;
        constructor(text: any);
        public trim(value: any): any;
        public readLine(): string;
        public readValue(): any;
        /** Returns the number of tuple values read (2 or 4). */
        public readTuple(tuple: any): number;
    }

    class SkeletonBounds {
        public polygonPool: any[];
        public polygons: any[];
        public boundingBoxes: any[];
        private minX;
        private minY;
        private maxX;
        private maxY;
        constructor();
        public update(skeleton: any, updateAabb: any): void;
        public aabbCompute(): void;
        /** Returns true if the axis aligned bounding box contains the point. */
        public aabbContainsPoint(x: any, y: any): boolean;
        /** Returns true if the axis aligned bounding box intersects the line segment. */
        public aabbIntersectsSegment(x1: any, y1: any, x2: any, y2: any): boolean;
        /** Returns true if the axis aligned bounding box intersects the axis aligned bounding box of the specified bounds. */
        public aabbIntersectsSkeleton(bounds: any): boolean;
        /** Returns the first bounding box attachment that contains the point, or null. When doing many checks, it is usually more
         * efficient to only call this method if {@link #aabbContainsPoint(float, float)} returns true. */
        public containsPoint(x: any, y: any): any;
        /** Returns true if the polygon contains the point. */
        public polygonContainsPoint(polygon: any, x: any, y: any): boolean;
        /** Returns true if the polygon contains the line segment. */
        public intersectsSegment(polygon: any, x1: any, y1: any, x2: any, y2: any): boolean;
        public getPolygon(attachment: any): any;
        public getWidth(): number;
        public getHeight(): number;
    }
}
declare module Fabrique {
    module Plugins {
        interface SpineObjectFactory extends Phaser.GameObjectFactory {
            spine: (x: number, y: number, key: string, group?: Phaser.Group) => Fabrique.Spine;
        }
        interface SpineCache extends Phaser.Cache {
            addSpine: (key: string, data: any) => void;
            getSpine: (key: string) => any;
            spine: {
                [key: string]: any;
            };
        }
        interface SpineLoader extends Phaser.Loader {
            spine: (key: string, url: string) => void;
            cache: SpineCache;
        }
        interface SpineGame extends Phaser.Game {
            add: SpineObjectFactory;
            load: SpineLoader;
            cache: SpineCache;
        }
        class Spine extends Phaser.Plugin {
            constructor(game: SpineGame, parent: PIXI.DisplayObject);
            private addSpineLoader();
            /**
             * Extends the GameObjectFactory prototype with the support of adding spine. this allows us to add spine methods to the game just like any other object:
             * game.add.spine();
             */
            private addSpineFactory();
            /**
             * Extends the Phaser.Cache prototype with spine properties
             */
            private addSpineCache();
        }
    }
}
declare module Fabrique {
    class Spine extends Phaser.Group {
        private skeleton;
        private skeletonData;
        private stateData;
        private state;
        private slotContainers;
        private lastTime;
        game: Fabrique.Plugins.SpineGame;
        /**
         * @class Spine
         * @extends Phaser.Group
         * @constructor
         * @param game {Phaser.Game} the game reference to add this object
         * @param key {String} the key to find the assets for this object
         */
        constructor(game: Fabrique.Plugins.SpineGame, key: string);
        autoUpdate: boolean;
        /**
         * Update the spine skeleton and its animations by delta time (dt)
         *
         * @method update
         * @param dt {Number} Delta time. Time by which the animation should be updated
         */
        update(dt?: number): void;
        /**
         * When autoupdate is set to yes this function is used as pixi's updateTransform function
         *
         * @method autoUpdateTransform
         * @private
         */
        autoUpdateTransform(): void;
        /**
         * Create a new sprite to be used with spine.RegionAttachment
         *
         * @method createSprite
         * @param slot {spine.Slot} The slot to which the attachment is parented
         * @param attachment {spine.RegionAttachment} The attachment that the sprite will represent
         * @private
         */
        createSprite(slot: any, attachment: any): Phaser.Sprite;
        createMesh(slot: any, attachment: any): PIXI.Strip;
        /**
         * [setMixByName wrap to stateData.setMixByName]
         * @param {String} fromName [source animation name]
         * @param {String} toName   [target animation name]
         * @param {Float} duration [Duration in the transition of the animations]
         */
        setMixByName(fromName: string, toName: string, duration: number): void;
        /**
         * exposing the state's setAnimation
         * We override the original runtime's error because warnings dont stop the VM
         *
         * @param {number}  trackIndex
         * @param {string}  animationName
         * @param {boolean} loop
         * @param {number}  delay
         * @returns {any}
         */
        setAnimationByName(trackIndex: number, animationName: string, loop: boolean): spine.TrackEntry;
        /**
         * exposing the state's addAnimation
         * We override the original runtime's error because warnings dont stop the VM
         *
         * @param {number}  trackIndex
         * @param {string}  animationName
         * @param {boolean} loop
         * @param {number}  delay
         * @returns {any}
         */
        addAnimationByName(trackIndex: number, animationName: string, loop: boolean, delay: number): spine.TrackEntry;
        /**
         * Exposing the skeleton's method to change the skin by skinName
         * We override the original runtime's error because warnings dont stop the VM
         *
         * @param {string}  skinName  The name of the skin we'd like to set
         */
        setSkinByName(skinName: string): void;
        /**
         * Exposing the skeleton's method to change the skin
         *
         * @param skin
         */
        setSkin(skin: spine.Skin): void;
        /**
         * Set to initial setup pose
         */
        setToSetupPose(): void;
        /**
         * You can combine skins here by supplying a name for the new skin, and then a nummer of existing skins names that needed to be combined in the new skin
         * If the skins that will be combined contain any double attachment, only the first attachment will be added to the newskin.
         * any subsequent attachment that is double will not be added!
         *
         * @param newSkinName
         * @param skinNames
         */
        getCombinedSkin(newSkinName: string, ...skinNames: string[]): spine.Skin;
    }
}
declare module Fabrique {
    /**
     * Supporting class to load images from spine atlases as per spine spec.
     *
     * @class SpineTextureLoader
     * @uses EventTarget
     * @constructor
     * @param basePath {String} Tha base path where to look for the images to be loaded
     * @param crossorigin {Boolean} Whether requests should be treated as crossorigin
     */
    class SpineTextureLoader {
        private game;
        private key;
        constructor(game: Phaser.Game, key: string);
        /**
         * Starts loading a base texture as per spine specification
         *
         * @method load
         * @param page {spine.AtlasPage} Atlas page to which texture belongs
         * @param file {String} The file to load, this is just the file path relative to the base path configured in the constructor
         */
        load: (page: any, file: string) => void;
        /**
         * Unloads a previously loaded texture as per spine specification
         *
         * @method unload
         * @param texture {BaseTexture} Texture object to destroy
         */
        unload: (texture: PIXI.BaseTexture) => void;
    }
}
