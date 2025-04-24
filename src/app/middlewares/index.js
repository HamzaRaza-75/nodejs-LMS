const errorHandler = require('./defaulterror.middleware');
const { NotFoundError, UnauthorizedError } = require('@utils');

const canOperate = (operationId, userId) => {
  if (!operationId) throw NotFoundError('Ops ! id is missing');
  if (operationId.toString() !== userId.toString()) {
    throw new UnauthorizedError('You are unautherized for this operation');
  }
};

module.exports = { errorHandler, canOperate };
