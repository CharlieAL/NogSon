import { Schema, model, models } from 'mongoose'

const finishGoodSchema = new Schema(
  {
    cliente: {
      type: String,
      required: [true, 'name is required'],
      trim: true,
      maxlength: [40, 'Username max length must be at least 40 characters']
    },
    comprador: {
      type: String,
      trim: true
    },
    precioVenta: {
      type: Number
    },
    precioTotal: {
      type: Number
    },
    cantidad: {
      type: Number
    },
    productoId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    status: {
      type: String,
      enum: ['pending', 'finished'],
      default: 'pending'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

finishGoodSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id
    delete returnObject._id
  }
})
export default models.finishGood || model('finishGood', finishGoodSchema)
